# Case Study - Interview Talking Points

## TL;DR

- This case study doubles as interview material: a 30-second pitch, a whiteboard flow, and answers to the eight questions you'll actually get.
- The strength is in trade-offs and incidents, not the happy path.
- Calibrate honesty: claim exactly what's here - two-person project, small scale, real lessons.

## The 30-second pitch

> "I built an online booking system for a three-location clinic group with one
> other developer - TypeScript, Postgres, deliberately boring infrastructure.
> The interesting parts were making double-booking structurally impossible with
> database exclusion constraints instead of distributed locks, handling
> DST-correct recurring slots, and running it all test-first where it mattered.
> I wrote up the decisions and what went wrong as ADRs and a retrospective."

Then let them pick the thread. Every answer below points into this section.

## Questions you should expect

| Likely question                      | Where the material lives                                                                                                                                 |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "How do you prevent double-booking?" | [ADR-002](01-decisions.md) - exclusion constraint vs Redis lock race analysis                                                                            |
| "Why not microservices?"             | [ADR-001](01-decisions.md) - team-size economics, module boundaries via lint rules                                                                       |
| "Tell me about a production bug."    | [Retrospective](03-retrospective.md) - silent worker death; note the fix took 2h and the skip cost more                                                  |
| "How did TDD actually help?"         | [Testing Strategy](02-testing-strategy.md) - policy amendment landed in <1 day, tests first; DST bug caught pre-prod                                     |
| "Where did you NOT use TDD and why?" | [Testing Strategy](02-testing-strategy.md#what-deliberately-did-not-get-tdd-d) - admin CRUD reasoning (interviewers love this question as a dogma check) |
| "How did you handle timezones/DST?"  | [ADR-003](01-decisions.md) + expansion-job amendment story                                                                                               |
| "What would you do differently?"     | [Retrospective](03-retrospective.md#if-we-started-again-tomorrow) - five concrete items, ranked                                                          |
| "How big was it really?"             | [Overview numbers](00-overview.md) - ~40 appts/day, ~180 unit tests; never inflate                                                                       |

## Whiteboard-ready: the booking flow

Be able to draw this from memory:

```text
Patient picks slot → API validates → INSERT with exclusion constraint
                                   ├─ ok    → outbox row (same tx) → 200
                                   └─ conflict → map to "slot taken" → patient refreshes
Worker loop: poll outbox → send reminder (24h before) → idempotency dedupe → mark sent
Nightly job: expand recurring availability 14 days ahead (DST-aware)
```

Failure modes worth volunteering before being asked: provider down (outbox
retries), worker dead (heartbeat alert), concurrent reschedule (constraint
again).

## Calibrating the honesty dial

This section's value is that it documents **real-sized engineering**: small
numbers, genuine mistakes, no Kubernetes. Presenting it as such reads as
maturity. Two calibration rules:

1. **Claim the decisions, not the scale.** "Small system, but the concurrency
   problem is the same one a hospital chain has" - true, and defensible under
   follow-ups.
2. **Own the incidents as yours.** "We skipped monitoring under deadline
   pressure" lands better than passive voice, and the cost/benefit framing
   (2-hour fix vs goodwill) shows judgment.

If an interviewer pushes beyond what's documented ("how would this handle 10k
concurrent users?"), bridge honestly: "That's past where I've tested it - my
next steps would be load-testing the peak window and revisiting ADR-001's
extraction seams." That answer demonstrates the exact methodology this repo
teaches: know your evidence boundary.

## Practice routine

1. Re-read [decisions](01-decisions.md) until you can state each rejected option _with its rejection reason_ from memory.
2. Draw the whiteboard flow above cold, twice.
3. Rehearse the pitch + the two incident stories aloud (5 minutes total).
4. Skim [Interview Preparation](../05-career/interview-prep.md) for the standard-question layer on top of this project-specific one.
