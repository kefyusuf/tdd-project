# TDD Common Pitfalls

## TL;DR

- Individual pitfalls: writing too many tests at once, oversized tests, trivial tests, forgetting to run the suite.
- Team pitfalls: partial adoption, slow suites, abandoned test suites.
- The most common way to ruin TDD is skipping the refactor step (Fowler).
- Testing implementation details and mocking everything are the modern classics.
- Every pitfall has a concrete antidote - see the table below.

## Individual mistakes

Agile Alliance catalogs the typical individual failures; each maps to a fix:

| Pitfall                                       | Symptom                               | Antidote                                                               |
| --------------------------------------------- | ------------------------------------- | ---------------------------------------------------------------------- |
| Forgetting to run tests frequently            | Long red stretches, surprise breakage | Run after every edit; wire an IDE file-watcher                         |
| Writing too many tests at once                | Hours without green                   | One test per cycle - see [Red, Green, Refactor](red-green-refactor.md) |
| Tests that are too large or coarse-grained    | Failing for ambiguous reasons         | One behavior per test; split on first failure                          |
| Overly trivial tests (no assertions, getters) | False confidence, maintenance cost    | Assert observable behavior or delete the test                          |
| Testing trivial accessors                     | Noise in suite                        | Don't TDD one-line delegations; they get covered transitively          |

## The neglected third step

Fowler: "The most common way that I hear to screw up TDD is neglecting the
third step." Without continuous refactoring, test-first development still
produces a messy aggregation of code - you paid the discipline cost and kept
none of the design benefit.

**Antidote:** treat refactor as part of _done_ for each cycle. On every green,
spend 1-2 minutes improving names and structure before the next red. See
[Clean Code and Refactoring](../04-engineering-culture/clean-code-refactoring.md).

## Modern implementation-detail traps

- **Mocking everything.** When every collaborator is a mock, refactoring
  internals breaks dozens of tests and the suite stops protecting behavior.
  Reserve mocks for true boundaries (network, clock, payment gateways) - see
  [Test Doubles](../03-testing-foundations/test-doubles.md).
- **Testing private functions directly.** If a private function needs its own
  test, either extract it into a public unit with meaning, or cover it through
  the public API.
- **Chasing 100% coverage.** Coverage measures execution, not verification.
  Aim for high confidence on critical paths instead of a number.
- **Slow suites.** A 20-minute unit suite stops being run locally; developers
  stop trusting it. Budget speed as a hard requirement.
- **Flaky tests left red.** A test that fails randomly trains the team to ignore
  red builds. Quarantine immediately and fix within days.

## Team-level pitfalls

From Agile Alliance's team catalog:

| Pitfall                                             | Consequence                                         | Countermeasure                                                                                  |
| --------------------------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Partial adoption (a few devs only)                  | Two-speed codebase, friction over "whose bug it is" | Pairing, coding dojos, shared definition of done                                                |
| Poor suite maintenance → prohibitively long runtime | Suite runs only in CI, feedback loop dies           | Enforce time budgets per layer in CI ([TDD in CI/CD](../04-engineering-culture/tdd-in-cicd.md)) |
| Abandoned test suite (seldom run)                   | Regression protection gone silently                 | Make red CI blocking; review failing-test hygiene in retros                                     |

## Warning signs checklist

- [ ] More than ~10 minutes since the last full-suite green run?
- [ ] Any test name containing "and", "or", or "sometimes"?
- [ ] Any commit message saying "fix flaky test" more than once?
- [ ] Anyone on the team afraid to refactor because "tests will break"?

Two or more checked means the practice is drifting.

## References

- [Agile Alliance - TDD: Common Pitfalls](https://www.agilealliance.org/glossary/tdd/)
- [Martin Fowler - Test Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
