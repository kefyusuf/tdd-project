# Interview Preparation - TDD-Focused Roles

## TL;DR

- Most common formats: live red-green-refactor pairing, take-home with tests, or discussion of your testing approach.
- Narrate the cycle out loud - interviewers assess discipline, not just the final code.
- Prepare crisp answers for the standard questions (below) and two stories of TDD in production.
- Asking about the company's testing culture is a positive seniority signal.

## What interviews actually look like

| Format                      | What is assessed                               | How to train                                                                                                                                   |
| --------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Live pairing kata           | Cycle discipline, baby steps, communication    | Timed [kata](../03-testing-foundations/katas.md) sessions, 30-45 min                                                                           |
| Take-home feature           | Test suite quality, naming, pyramid judgment   | Ship it with tests that read as documentation                                                                                                  |
| Discussion / system design  | Where tests live, boundaries, doubles strategy | Rehearse the [Test Pyramid](../03-testing-foundations/test-pyramid.md) and [test doubles](../03-testing-foundations/test-doubles.md) reasoning |
| Legacy refactoring exercise | Characterization tests, seams, safe steps      | Practice Gilded Rose's refactor path                                                                                                           |

## Narrating the cycle (live exercise)

Say what you are doing and why:

- "I'll start with a test list so we agree on the sequence."
- "Red: this test pins the empty-input case. Watch it fail."
- "Green: the simplest thing that passes is returning 0 - I know it looks like cheating; the next test will force generalization."
- "It passes. Before adding behavior I want to refactor: extract the parsing."

Interviewers listen for: one test at a time, failure observed before
implementation, refactor on green, and visible comfort with "fake it till you
make it".

## Standard questions and strong answer shapes

**"What is TDD actually for?"**
Design feedback and behavioral safety net; verification alone doesn't need
test-first. Cite the interface-first benefit ([Fundamentals](../01-tdd/fundamentals.md)).

**"Isn't it slower?"**
More initial effort offset by less late-phase debugging - Agile Alliance's
summary of team reports. Add your own production story.

**"When would you not use TDD?"**
Throwaway prototypes, pure exploration spikes - bring them under test when they
graduate. Shows judgment, not dogma.

**"Mocks or no mocks?"**
Classicist default inside domain logic; doubles at architectural boundaries.
Reference the [state vs interaction distinction](../03-testing-foundations/test-doubles.md).

**"How do you handle databases/external services?"**
Unit-test logic purely; integration-test real boundaries via containers;
reserve E2E for critical journeys.

**"A test broke but the feature works - what now?"**
Diagnose whether behavior changed or the test encoded implementation details;
fix accordingly; if flaky, quarantine per protocol ([CI/CD](../04-engineering-culture/tdd-in-cicd.md)).

## Red flags to avoid

- Writing all tests after the code during a "TDD" exercise
- Asserting nothing (`expect(x).toBeDefined()` everywhere)
- Testing private methods
- Arguing 100% coverage is mandatory
- Never running the suite until the end

## Questions to ask them (testing culture)

1. "What does your pipeline run on a pull request, and how long does it take?"
2. "How do you handle flaky tests?"
3. "Do bug fixes require reproducing tests?"
4. "When did someone last refactor something big, and what made it safe?"

Their answers tell you whether TDD is practiced or just listed.

## Two-week prep plan

| Days  | Activity                                                                     |
| ----- | ---------------------------------------------------------------------------- |
| 1-3   | Re-read core section; redo String Calculator from scratch daily              |
| 4-6   | Bowling Game + Gilded Rose under time pressure                               |
| 7-8   | Mock answers above aloud; record yourself once                               |
| 9-10  | Take-home simulation: small feature, shipped with exemplary suite            |
| 11-12 | Review [Job Market Analysis](job-market-analysis.md); tailor resume phrasing |
| 13-14 | Rest; light review of cheat sheets only                                      |

## References

- [Skill Levels](../01-tdd/skill-levels.md) - self-assessment tiers interviewers probe
- [FAQ](../01-tdd/faq.md) - the debate questions come up verbatim
