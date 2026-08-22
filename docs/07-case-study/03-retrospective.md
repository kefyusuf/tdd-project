# Case Study - Retrospective

## TL;DR

- Two incidents post-launch, both minor, both traceable to gaps we'd been warned about - monitoring and scope negotiation.
- The architecture held up: zero ADRs reversed, one amended.
- Biggest process win: acceptance scenarios with the clinic manager.
- Biggest personal lesson: "boring infrastructure" still needs _someone_ watching it.

Run after launch + 6 weeks, written up as it happened (lightly edited for
anonymity).

## What went well

1. **The exclusion constraint (ADR-002) never blinked.** Reception's double-book
   horror stories went to zero. The concurrency test gave us the confidence to
   say "impossible" in a meeting and mean it.
2. **Acceptance scenarios killed requirement churn.** Writing Given/When/Then
   with the clinic manager before each flow meant UAT contained zero surprises.
   The one argument we had (deposits vs. cancellation policy) happened in
   requirements, where it was cheap.
3. **Modular monolith pace.** Two part-time developers shipped weekly because
   nothing needed coordinating. The import-lint rules felt bureaucratic for a
   week and then quietly prevented three cross-module hacks.
4. **Test-first domain logic.** New policy variants (the ADR-005 amendment)
   landed in under a day each, tests leading. That's the [skill-levels](../01-tdd/skill-levels.md)
   "intermediate" tier working as described.

## What went wrong

### The silent worker death (ADR-004)

Three weeks after launch, reception reported "some patients didn't get
reminders." The outbox worker process had crashed on a misconfigured holiday
calendar import - and nothing told us. The outbox table filled up politely,
retrying into the void.

**Cost:** ~40 patients got reminders a day late, one angry phone call, an hour
of debugging at night.
**Fix:** healthcheck endpoint + external uptime monitor on the worker's
heartbeat row; alert if `max(updated_at)` in outbox exceeds 5 minutes.
**Honest note:** every book we read said "observability is not optional." We
deprioritized it under deadline pressure anyway. The fix took two hours; the
decision to skip it cost more than two hours of goodwill.

### The timezone near-miss (ADR-003)

Caught in testing, not production - but only _because_ reception happened to
check the week after DST. The recurrence design had been hand-waved in month 1
("compute on the fly"), and the amendment to an expansion job came from this
scare. Full story in [Testing Strategy](02-testing-strategy.md).
**Lesson:** the ADR's "Consequences" section predicted the failure mode; we
still underinvested in testing it until the scare. Predicting risk ≠ acting on
risk.

### The over-engineered detour

Month 2, I built a "flexible slot template" abstraction anticipating
requirements nobody had stated - three interfaces, a builder, the works. It
made the simple case (fixed weekly hours) harder to edit. Deleted most of it in
month 3 when the expansion job replaced its purpose. Cost: maybe four days
net-negative. The [pitfalls](../01-tdd/common-pitfalls.md) page calls this
testing-implementation-details' cousin: designing for imagined flexibility.

## Numbers at 6 weeks post-launch

| Metric                     | Value                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------ |
| Appointments booked online | ~2,900                                                                                     |
| Double-bookings            | 0                                                                                          |
| Production defects found   | 2 (both minor: a timezone display edge in the stats view, one email dedupe false positive) |
| No-show rate               | down from ~18% to ~9% (email reminders + stricter cancellation policy)                     |
| Suite runtime drift        | 45s → 90s → back to ~50s after fixture rework                                              |
| ADRs reversed              | 0 (1 amended: ADR-003)                                                                     |

## If we started again tomorrow

1. Monitoring/healthchecks in the definition-of-done from week 1, not post-incident.
2. Push harder for deposits instead of policy-only no-show mitigation - the
   policy helped, money talks louder.
3. Write the slot-expansion tests on day one of ADR-003, not after the scare.
4. Skip the flexible-template detour; let the third requirement pay for the
   abstraction ([rule of three](../04-engineering-culture/clean-code-refactoring.md)).
5. Budget one day for load-checking the evening peak - we never tested beyond
   functional correctness, and got lucky.

## What this project taught us about the methodologies in this repo

- TDD's real payoff showed up in _change_ speed (policy amendments), not initial speed - exactly as the [fundamentals](../01-tdd/fundamentals.md#expected-benefits) section claims.
- BDD's value was the conversation, not the tooling - we never needed Gherkin automation for scenarios that stayed prose ([BDD misconceptions](../02-methodologies/bdd.md)).
- ADRs earned their keep the moment we forgot _why_ the outbox existed and the doc answered in 30 seconds ([decisions](01-decisions.md)).
