# Case Study - Architecture Decisions (ADRs)

## TL;DR

- Five decisions, written as ADRs _while_ building, not reconstructed afterwards.
- The pattern to notice: every "boring" choice beat a clever one for a two-person team.
- ADR-005 was amended after clinic feedback - real projects change their minds.
- Rejected options are documented with the reasons we rejected them, so future-us doesn't relitigate.

Format follows the classic ADR template: Status / Context / Options /
Decision / Consequences. Consequences include negative ones - an ADR without a
downside listed is marketing, not engineering.

---

## ADR-001: Modular monolith instead of microservices

**Status:** Accepted (month 1) - would re-accept today
**Context:** Two part-time developers, three locations, ~40 appointments/day.
The booking domain has natural seams (scheduling, notifications, admin), which
makes service boundaries tempting on paper.
**Options considered:**

| Option                   | Pros                                                                            | Cons                                                                |
| ------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Microservices per domain | Independent deploys, resume-friendly buzzwords                                  | Local dev orchestration, distributed debugging, deploy pipelines ×N |
| Modular monolith         | One deploy, in-process calls, module boundaries enforced by folder + lint rules | Must discipline ourselves against cross-module imports              |

**Decision:** Modular monolith. Three internal modules (`scheduling`,
`notifications`, `admin`) communicating through exported interfaces only;
enforced with ESLint import rules rather than hope.
**Consequences:** (+) Shipped features weekly; whole system debuggable with one
`docker logs`. (−) A bad deploy takes everything down - mitigated by staging
environment and boring release process. (−) If load ever grew 100×, extraction
work would be real; at 40 appointments/day that's a good problem to have.

---

## ADR-002: Database constraint for slot exclusivity (no Redis locks)

**Status:** Accepted (month 1)
**Context:** Reception's #1 requirement: double-booking must be impossible,
even when two patients tap "book" on the same slot simultaneously during the
evening peak.
**Options considered:**

1. **Application-level check-then-insert** - simplest code, but two concurrent
   requests can both pass the check (TOCTOU race). Rejected.
2. **Redis distributed lock around booking** - works, but adds a second stateful
   system whose failure modes we'd have to reason about (lock expiry mid-write?
   Redis down = can't book?). Rejected: wrong trade for our team size.
3. **Postgres exclusion constraint on time ranges** - integrity enforced by the
   same database holding the data; no extra infrastructure.

**Decision:** `tstzrange` column + GiST exclusion constraint:

```sql
CREATE TABLE appointment (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid NOT NULL REFERENCES therapist(id),
  starts_at    timestamptz NOT NULL,
  duration_min int NOT NULL CHECK (duration_min > 0),
  slot         tstzrange NOT NULL,
  status       text NOT NULL DEFAULT 'booked',
  EXCLUDE USING gist (
    therapist_id WITH =,
    slot WITH &&
  ) WHERE (status <> 'cancelled')
);
```

The application still pre-checks availability for friendly error messages - but
the database is the bouncer, not the suggestion box.
**Consequences:** (+) Race conditions became structurally impossible; our test
suite hammers concurrent bookings against real Postgres and cannot break it.
(+) Cancellations free the slot automatically via the partial-constraint
predicate. (−) Error messages from constraint violations need mapping to
patient-friendly text ("slot just got taken") - handled in one mapper function.
(−) Rescheduling is update-with-conflict-handling, slightly more code than
delete+insert.

---

## ADR-003: Store UTC everywhere; convert only at the edges

**Status:** Accepted (month 2) - amended month 3 (recurring slots)
**Context:** All three clinics share one timezone today, but therapists take
holiday coverage across locations, and "next year we might open a clinic in
another region" was said more than once. Also, DST transitions exist and hate
naive datetime code.
**Options considered:**

| Option                                 | Outcome                                                                                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Store local wall-clock times           | Simple queries, catastrophic DST behavior. Rejected after writing the failing tests first (see [Testing Strategy](02-testing-strategy.md)). |
| Store UTC + IANA timezone per location | Correct by construction; all math in UTC, conversion only for display/input parsing. Chosen.                                                |

**Decision:** All timestamps stored as `timestamptz` (UTC). Each location row
carries its IANA timezone. Input parsing converts patient-local → UTC at the
API edge; rendering converts UTC → viewer-local at the presentation edge.
**Consequences (including the amendment):**
(+) DST transitions handled by the timezone library, not by us.
(−) "Next Tuesday 09:00" recurring availability can't be a single row - it must
be **expanded** into concrete slots per week, because 09:00 wall-clock maps to
different UTC instants across DST changes. We initially hand-waved this as
"compute slots on the fly", then amended the design (month 3) to a nightly
expansion job materializing 14 days of slots into the availability table. The
amendment happened because the on-the-fly version made overlap constraints
(ADR-002) awkward to express for generated slots. Lesson recorded: constraints
influence upstream design, not just storage.

---

## ADR-004: Transactional outbox + cron worker instead of a message broker

**Status:** Accepted (month 2)
**Context:** FR-4 requires reminders 24h ahead; reschedule/cancel flows also
trigger emails. Sending email inside the HTTP request couples latency and
failure to the provider, and losing a reminder silently is exactly the kind of
bug reception notices before we do.
**Options considered:**

| Option                           | Verdict                                                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Send directly in request handler | Rejected: provider hiccup = failed booking UX                                                                                        |
| Kafka / RabbitMQ                 | Rejected: operating a broker outweighs our message volume (~200/day)                                                                 |
| Outbox table + worker loop       | Postgres transaction writes `outbox` row atomically with the booking; a small worker polls, sends via email API, marks sent. Chosen. |

**Decision:** `outbox` table with `idempotency_key`, status, attempts, and
`available_at` for retry backoff. Worker runs on a 30-second loop inside the
same container (separate process entrypoint).
**Consequences:** (+) No lost reminders even if the provider is down - rows wait
and retry with backoff. (+) Zero new infrastructure. (−) At-least-once delivery:
a crash between send and mark-sent duplicates an email - solved with
`idempotency_key` respected by templating (dedupe within 10 minutes).
(−) **The consequence that bit us:** the worker dying silently wasn't visible
anywhere. Discovered when reception said "patients didn't get reminders" -
see [Retrospective](03-retrospective.md). Monitoring was added post-launch; it
should have been in scope from day one.

---

## ADR-005: Plain-code cancellation policy, no rule engine

**Status:** Accepted (month 2); **Amended (month 3)** - per-service lead times added
**Context:** FR-5 wants cancellations blocked close to start time, and the owner
kept saying policies might differ "per treatment type eventually".
**Options considered:**

1. **Rule engine / JSON DSL** - flexible, demoable… and a second language to
   maintain, debug, and explain to nobody who asked for it. Rejected (YAGNI).
2. **Hardcoded single policy** - simplest possible, but "eventually" arrived in
   week nine.
3. **Policy classes selected by service type** - plain TypeScript objects with
   `canCancel(appointment, now): Result`. Chosen.

```ts
export interface CancellationPolicy {
  canCancel(appt: Appointment, now: Instant): PolicyResult;
}

// The whole "engine" - deliberately boring:
const POLICIES: Record<string, CancellationPolicy> = {
  assessment: new LeadTimePolicy(hours(24)),
  standardSession: new LeadTimePolicy(hours(12)),
  groupClass: new NoRefundAfterStart(),
};
```

**Consequences:** (+) Every policy branch is unit-test-driven; adding a service
type is a one-line map entry plus tests. (−) Non-developers can't edit policies,
accepted because the request never came from non-developers.
**Amendment (month 3):** clinic asked for different lead times per therapist
seniority, not per service type. The policy-object shape absorbed it cleanly -
which retroactively justified choosing structure over hardcoding, though we'd
have been equally fine with hardcoded values for another year.

---

## Decision log summary

| ADR | One-liner                               | Confidence then                | Confidence now                |
| --- | --------------------------------------- | ------------------------------ | ----------------------------- |
| 001 | Modular monolith                        | High                           | Higher                        |
| 002 | DB exclusion constraint over Redis lock | High                           | Higher                        |
| 003 | UTC everywhere + slot expansion job     | Medium (hand-waved recurrence) | High after amendment          |
| 004 | Outbox + cron over broker               | High                           | High, minus monitoring regret |
| 005 | Policy objects over DSL                 | Medium                         | High                          |

## References

- [ADR origins - Michael Nygard's document architecture](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions)
- How these choices were verified: [Testing Strategy](02-testing-strategy.md)
