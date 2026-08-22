# Glossary

## TL;DR

- Single source of terminology for the whole repository.
- When writing docs, use these terms with exactly these meanings.
- Propose new terms via a PR; add them here first, then use them in guides.

## Terms

| Term                                      | Definition                                                                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| AAA (Arrange-Act-Assert)                  | Test structure pattern: set up inputs, perform the action under test, verify the outcome.                                |
| Agile                                     | An umbrella term for iterative, feedback-driven software delivery based on the Agile Manifesto values.                   |
| Anti-pattern                              | A commonly reinvented solution that is ineffective or harmful.                                                           |
| ATDD (Acceptance Test-Driven Development) | Writing acceptance-level tests with the customer before implementation begins; the tests drive development.              |
| BDD (Behavior-Driven Development)         | A team collaboration practice using concrete examples of system behavior; often expressed in Given/When/Then form.       |
| Bounded context                           | A DDD boundary within which a model and its ubiquitous language are consistent.                                          |
| CI/CD                                     | Continuous Integration / Continuous Delivery: automated build, test, and release pipeline.                               |
| Coverage                                  | The percentage of code executed by tests. Useful as an indicator, misleading as a target.                                |
| DDD (Domain-Driven Design)                | A design approach that aligns code structure with the business domain through collaboration with domain experts.         |
| Detroit style (classicist) TDD            | TDD using real collaborating objects where practical; state-based verification. Contrast: London style.                  |
| Discovery workshop                        | A structured BDD conversation where the team explores behavior through concrete examples before building.                |
| E2E test (end-to-end)                     | A test driving the full deployed application as a user would; slowest but most realistic layer.                          |
| Fake                                      | A working lightweight implementation of a dependency (e.g., in-memory repository). One of the five test doubles.         |
| FIRST                                     | Qualities of good unit tests: Fast, Independent, Repeatable, Self-validating, Timely.                                    |
| Flaky test                                | A test that passes and fails intermittently without code changes; erodes trust in the suite.                             |
| Given/When/Then                           | Gherkin structure for describing behavior: precondition, action, expected outcome.                                       |
| Green                                     | The phase where the minimal amount of code makes the failing test pass.                                                  |
| Integration test                          | A test verifying that multiple components work together (e.g., service plus database).                                   |
| Kata                                      | A small practice exercise repeated to internalize a technique, borrowed from martial arts training.                      |
| London style (mockist) TDD                | TDD using test doubles for all collaborators; interaction-based verification between units.                              |
| Mock                                      | A test double pre-programmed with expectations about interactions; verifies calls it should receive.                     |
| Refactoring                               | Changing code structure without changing observable behavior, to improve readability and design.                         |
| Regression                                | Reappearance or persistence of previously working behavior after a change.                                               |
| Red                                       | The phase where a newly written test fails for the expected reason.                                                      |
| Red-Green-Refactor                        | The core TDD loop: write a failing test, make it pass minimally, clean up the code.                                      |
| SUT (System Under Test)                   | The specific unit being tested, as opposed to its collaborators.                                                         |
| Stub                                      | A test double returning canned answers to calls; used when you need controlled inputs, not call verification.            |
| Spy                                       | A test double that records how it was called so assertions can be made afterward.                                        |
| Technical debt                            | The future cost created by choosing an easy-but-messy solution now instead of a better one that takes longer.            |
| Test double                               | Umbrella term (Meszaros) for dummy, fake, stub, spy, and mock - objects standing in for real dependencies.               |
| Test list                                 | Fowler's initial TDD step: enumerate the tests you intend to write before starting the cycle.                            |
| Test pyramid                              | Mike Cohn's model for distributing automated tests: many unit, fewer integration, few end-to-end.                        |
| Three Amigos                              | A BDD conversation between product, development, and testing perspectives.                                               |
| Ubiquitous language                       | A shared, precise vocabulary between developers and domain experts, reflected directly in code.                          |
| Unit test                                 | A fast, isolated test verifying one unit of behavior in isolation from slow or external dependencies.                    |
| XP (Extreme Programming)                  | An agile engineering methodology whose practices include TDD, pair programming, continuous integration, and refactoring. |

## References

- [Agile Alliance glossary](https://www.agilealliance.org/glossary/tdd/)
- [Martin Fowler's bliki](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
- [Cucumber documentation](https://cucumber.io/docs/bdd/)
