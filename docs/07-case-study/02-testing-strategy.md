# Case Study - Testing Strategy

## TL;DR

- Domain logic was strictly test-first; admin CRUD screens were not - and we're fine with that trade.
- The database constraint (ADR-002) was verified with real concurrent connections, not mocks.
- Acceptance scenarios written _with_ the clinic manager doubled as our E2E suite spec.
- One production-bound DST bug was caught by a test written after the near-miss - test-driven bug fixing in action.

## Distribution (measured at launch)

| Layer                                  | Count | Runtime | What lives here                                                                                                                      |
| -------------------------------------- | ----- | ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Unit (Vitest)                          | ~180  | ~6s     | Booking rules, cancellation policies, timezone math, outbox relay logic, slot expansion                                              |
| Integration (real Postgres via Docker) | ~35   | ~45s    | Exclusion constraint races, repository queries, migrations up/down                                                                   |
| E2E (Playwright)                       | 6     | ~3 min  | The journeys reception cared about: book, reschedule, cancel, double-book rejection, admin schedule edit, reminder visible in outbox |

The shape roughly matches the [Test Pyramid](../03-testing-foundations/test-pyramid.md),
not by policy enforcement but because writing tests below the cost line
stopped making sense.

## What got the full red-green-refactor treatment

- **Overlap detection and booking rules** (ADR-002's application side)
- **Cancellation/reschedule policies** (ADR-005) - every branch of every policy
- **Timezone conversion helpers** - parsing patient input, rendering output
- **Outbox relay logic** - retry backoff, idempotency dedupe window, worker crash simulation
- **Slot expansion job** - DST boundaries included

These are exactly the modules where wrong behavior costs money or trust, which
is where the discipline pays for itself.

## What deliberately did NOT get TDD'd

Being honest about this is part of the strategy:

| Area                                 | Why skipped                                                                                                                                        |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Admin CRUD screens (schedule editor) | Thin forms over repositories; the risk lives in the queries underneath, which integration tests cover. TDD-ing form wiring would have been ritual. |
| Deployment scripts / Dockerfile      | Verified by staging deploys instead                                                                                                                |
| The stats view SQL                   | Tuned interactively against a data snapshot; locked in later by one integration test                                                               |

The lesson we took: TDD is an investment decision per module, not a religion -
matching what the [FAQ](../01-tdd/faq.md) says about dogma.

## Worked example: overlap detection cycles

Three condensed cycles from the actual sequence:

**Cycle 1 - adjacent slots must be allowed** (reception books back-to-back
sessions all day):

```ts
it("allows booking a slot starting when another ends", async () => {
  await repo.create({ therapistId: "t1", slot: range("09:00", "09:30") });

  const result = await booking.book({ therapistId: "t1", start: "09:30", minutes: 30 });

  expect(result.ok).toBe(true);
});
```

This failed initially - the naive implementation compared `start < other.end`,
excluding touching ranges. Fixed by switching to proper interval intersection
(`slot &&` semantics from ADR-002's constraint).

**Cycle 2 - containment overlap rejected:**

```ts
it("rejects a slot fully inside another booking", async () => {
  await repo.create({ therapistId: "t1", slot: range("09:00", "10:00") });

  const result = await booking.book({ therapistId: "t1", start: "09:15", minutes: 10 });

  expect(result).toEqual(err("SLOT_TAKEN"));
});
```

Green immediately - the generalized interval logic already covered it.
(Triangulation working as intended.)

**Cycle 3 - cancelled appointments release their slot:**

Initially failed because the query ignored status; fixed by filtering
`status <> 'cancelled'`, mirroring the partial exclusion constraint. Test and
constraint now encode the same rule in two layers - intentional redundancy:
the DB is the bouncer ([ADR-002](01-decisions.md)), the unit test documents intent.

## Concurrency verification (integration layer)

Mocks can't prove ADR-002. The integration suite fires N parallel booking
attempts at the same slot against real Postgres:

```ts
it("admits exactly one winner among parallel bookings of the same slot", async () => {
  const attempts = await Promise.allSettled(
    Array.from({ length: 12 }, (_, i) =>
      bookingAsPatient(`patient-${i}`, { therapistId: "t1", start: "17:00", minutes: 30 }),
    ),
  );

  const winners = attempts.filter((a) => a.status === "fulfilled" && a.value.ok);
  expect(winners).toHaveLength(1);
});
```

Twelve losers get mapped to the friendly "just taken" message. This single test
has caught more would-be embarrassments than everything else combined.

## Acceptance scenarios as shared language

Before building each flow, we wrote Given/When/Then examples _with_ the clinic
manager ([BDD discovery](../02-methodologies/bdd.md), minus the ceremony - no
Gherkin tooling, just a shared doc):

```gherkin
Scenario: cancelling inside the lead-time window
  Given a standard session tomorrow at 14:00
  When the patient cancels today at 16:00   # less than 12h before
  Then cancellation is refused with the policy explanation
```

Disagreements surfaced in those sentences ("wait - can they cancel a group class
at all?") instead of during UAT. Six of these became the Playwright E2E set;
the rest stayed as documentation.

## Test-driven bug fixing: the DST catch

During month 3 testing, a slot shown as 09:00 on Friday appeared as 10:00 after
the DST weekend. Following [test-driven bug fixing](../01-tdd/skill-levels.md),
we first wrote the failing test reproducing it across the transition date:

```ts
it.each(dstTransitionDates())("expands recurring slots correctly across %s", (date) => {
  const slots = expandWeeklySlot({
    weekday: "MONDAY",
    wallClock: "09:00",
    locationTz: "Europe/Berlin",
    weekOf: date,
  });

  expect(slots[0].startsUtc).toBe(instantAtBerlinWallClock(date, "09:00"));
});
```

Then fixed the expansion logic. The root cause lived exactly where
[ADR-003](01-decisions.md) warned it would - recurrence + wall-clock time. The
bug never reached patients, which is the whole pitch for this discipline.

## Suite health over time

Honest numbers: by month 4 the unit+integration run had crept to ~90 seconds,
and watch-mode feedback felt sluggish. Fixes: replaced heavyweight fixtures with
per-test transactions (rollback instead of truncate), and moved three slow
Playwright flows behind a `@critical` marker so local runs execute only those
unless `--all` is passed. Back under ~50s locally. See
[Common Pitfalls](../01-tdd/common-pitfalls.md#team-level-pitfalls) - slow-suite
drift is exactly the failure mode we read about beforehand and still walked into.
