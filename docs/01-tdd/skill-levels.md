# TDD Skill Levels

## TL;DR

- The Agile Alliance defines three skill tiers: Beginner, Intermediate, Advanced.
- Use the checklists below for honest self-assessment and pairing plans.
- Advancement comes from deliberate practice - katas with increasing constraints.

## Beginner

You can:

- [ ] Write a unit test **before** writing the code it covers
- [ ] Write just enough code to make a failing test pass
- [ ] Keep tests independent of execution order
- [ ] Read a failing test's message and act on it
- [ ] Run the whole suite in seconds locally

Practice: [String Calculator](../03-testing-foundations/katas.md), FizzBuzz,
leap years - one cycle at a time, no shortcuts.

## Intermediate

You can:

- [ ] Practice **test-driven bug fixing**: reproduce the defect with a failing test before fixing it
- [ ] Decompose a compound feature into an ordered sequence of unit tests (a test list)
- [ ] Name and apply guiding tactics - e.g., "for recursion, write the terminating case first"
- [ ] Factor reusable setup out of tests into helpers/fixtures without losing independence
- [ ] Choose deliberately between classicist and mockist styles per situation ([Test Doubles](../03-testing-foundations/test-doubles.md))

Practice: test-driven bug fixing on your own backlog; Gilded Rose; Bowling Game.

## Advanced

You can:

- [ ] Formulate a roadmap of planned tests for macroscopic features, revising it as design insight arrives
- [ ] Test-drive multiple design paradigms: object-oriented, functional, event-driven
- [ ] Test-drive across technical domains: computation, UIs, persistence, concurrency
- [ ] Coach a team: run mob TDD sessions, review suite health metrics, unblock stuck practitioners
- [ ] Adapt the discipline to legacy contexts - seams and characterization tests from _Working Effectively with Legacy Code_

(Skill definitions adapted from the Agile Alliance TDD glossary.)

## Progression tips

| From                    | To                | What changes                                                                         |
| ----------------------- | ----------------- | ------------------------------------------------------------------------------------ |
| Beginner → Intermediate | Speed to judgment | You stop asking "which test next?" mechanically and start sequencing by design value |
| Intermediate → Advanced | Scope             | Single functions → whole features → systems and teams                                |

Constraints that force growth:

1. No mouse during red-green-refactor (keyboard fluency).
2. Delete all code and re-solve a kata from scratch daily until it takes under 30 minutes.
3. Pair with someone stronger and let them drive every other cycle.

## Where this matters professionally

Interviewers probe exactly these tiers - live TDD exercises distinguish
beginners from intermediates quickly. See [Interview Preparation](../05-career/interview-prep.md)
and the self-assessment signals recruiters look for in the
[Job Market Analysis](../05-career/job-market-analysis.md).

## References

- [Agile Alliance - TDD: Skill Levels](https://www.agilealliance.org/glossary/tdd/)
