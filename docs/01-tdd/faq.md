# TDD FAQ

## TL;DR

- "Is TDD dead?" - the 2014 debate challenged dogma, not the discipline; TDD remains a standard job requirement.
- TDD works for databases, UIs, and legacy code - with adjusted strategies.
- 100% coverage is not the goal; confidence on behavior is.
- Classicist vs mockist is a legitimate style choice; pick per context.

## Is TDD dead?

In 2014, DHH published "TDD is dead - long live testing", arguing that
test-first dogma had gone too far. Fowler and Beck joined him for a public
discussion series ([Is TDD Dead?](https://martinfowler.com/articles/is-tdd-dead/)).
The consensus that emerged: unit testing and test-first development remain
valuable tools, but they are not religion - over-mocked code and slow suites
were real problems worth criticizing. A decade later, TDD still appears as an
expectation in mid/senior job postings (see the
[Job Market Analysis](../05-career/job-market-analysis.md)).

## Doesn't writing tests first double my work?

It changes where time goes rather than strictly adding to it. Teams report more
initial effort offset by less late-phase debugging and regression fixing
([Agile Alliance on expected benefits](https://www.agilealliance.org/glossary/tdd/)).
The honest caveat: in throwaway code, TDD is usually waste - it pays where code
lives.

## Can you TDD with databases?

Yes - by adjusting the layer boundaries:

- Domain logic: pure functions/classes, no DB involved (the bulk of TDD).
- Persistence itself: integration tests against a real database engine
  (containers or ephemeral instances). Keep these below the E2E layer of the
  [Test Pyramid](../03-testing-foundations/test-pyramid.md).

Trying to mock the database everywhere produces tests that pass while the real
queries are broken.

## Can you TDD user interfaces?

Component-level UI logic (state machines, view models, hooks) TDDs well with
fast rendering tests. Full pixel-level flows belong at the top of the pyramid:
a few, slow, high-value journeys - not thousands.

## What about existing code without tests? (legacy)

Michael Feathers' definition: legacy code is code without tests. The strategy
is _not_ "stop and write tests for everything":

1. Find seams - points where behavior can be observed or substituted.
2. Write characterization tests pinning current behavior, even if buggy-looking.
3. Refactor under that net, then apply normal TDD to new changes.

See _Working Effectively with Legacy Code_ in the [Reading List](../06-resources/reading-list.md).

## Do I need 100% coverage?

No. Coverage answers "what did the tests execute?", never "are the assertions
meaningful?". Practical policy: high expectations on business-critical modules,
pragmatic thresholds elsewhere, zero tolerance for untested bug fixes (every fix
ships with its reproducing test).

## Classicist vs mockist - which should I use?

|                        | Classicist (Detroit)            | Mockist (London)                    |
| ---------------------- | ------------------------------- | ----------------------------------- |
| Collaborators          | Real objects where practical    | Doubles for all collaborators       |
| Verification focus     | End state                       | Interactions between units          |
| Refactoring resilience | Higher                          | Lower (tests encode call structure) |
| Isolation of failures  | Sometimes deeper tracing needed | Immediate localization              |

Start classicist for domain logic; use doubles at architectural boundaries.
Details in [Test Doubles](../03-testing-foundations/test-doubles.md).

## How is TDD different from just "writing good tests"?

Ordering. Tests written after implementation verify what was built; tests
written first specify what should be built and pressure the design toward
testability. The design feedback loop - interface-first thinking - is the part
that disappears when tests come second.

## Where does BDD fit compared to TDD?

BDD operates one conversation level up: concrete behavioral examples agreed
with product people, often automated through Given/When/Then scenarios, with
TDD-style cycles inside each step. See [BDD](../02-methodologies/bdd.md) and the
[comparison matrix](../02-methodologies/overview.md).

## References

- [Martin Fowler et al. - Is TDD Dead?](https://martinfowler.com/articles/is-tdd-dead/)
- [Agile Alliance - TDD glossary](https://www.agilealliance.org/glossary/tdd/)
- [Martin Fowler - Test Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
