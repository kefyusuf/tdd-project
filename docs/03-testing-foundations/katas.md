# Kata Catalog

## TL;DR

- A kata is a small exercise repeated until the technique - not the solution - becomes automatic.
- Start with String Calculator; it is the canonical TDD teaching kata.
- Each kata below lists the specific skill it trains.
- Do them in a scratch project using the [Vitest](framework-cheatsheets/vitest-jest.md) or [pytest](framework-cheatsheets/pytest.md) cheat sheet.

## How to practice a kata

1. Read the requirements once, then close them.
2. Write your **test list** first ([Red, Green, Refactor](../01-tdd/red-green-refactor.md)).
3. Cycle strictly: no production code without a failing test.
4. On every green, refactor before the next red.
5. Repeat the same kata on later days; measure cycle smoothness, not just completion.
6. Advanced constraint: delete everything and redo from scratch - target under 30 minutes.

## Catalog

| Kata                    | Trains                                                                                 | Source                                                                                              |
| ----------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| String Calculator       | The full red-green-refactor loop, incremental requirements, test lists                 | [osherove.com/tdd-kata-1](https://osherove.com/tdd-kata-1)                                          |
| FizzBuzz                | First failing test discipline, parametrized tests                                      | Anywhere; implement strictly test-first as an exercise                                              |
| Leap Years              | Trivial-looking problems still benefit from triangulation                              | [ardalis/kata-catalog](https://github.com/ardalis/kata-catalog)                                     |
| Roman Numerals          | Data-driven design decisions, translation logic                                        | [ardalis/kata-catalog](https://github.com/ardalis/kata-catalog)                                     |
| Prime Factors           | Recursion tactics (terminating case first)                                             | [ardalis/kata-catalog](https://github.com/ardalis/kata-catalog)                                     |
| Bowling Game            | Classicist TDD with state objects, resisting big-design-up-front                       | [ardalis/kata-catalog](https://github.com/ardalis/kata-catalog)                                     |
| Gilded Rose             | Working under constraints, characterization tests before refactoring legacy-style code | [EmilyBache/GildedRose-Refactoring-Kata](https://github.com/EmilyBache/GildedRose-Refactoring-Kata) |
| Tennis Refactoring Kata | Refactoring under a green net, conditionals to polymorphism                            | [emilybache/Tennis-Refactoring-Kata](https://github.com/emilybache/Tennis-Refactoring-Kata)         |

## Choosing by skill level

| Level ([self-assessment](../01-tdd/skill-levels.md)) | Recommended                                                                                 |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Beginner                                             | FizzBuzz → Leap Years → String Calculator                                                   |
| Intermediate                                         | Roman Numerals → Bowling Game → test-driven bug fixing in your own project                  |
| Advanced                                             | Gilded Rose (refactor path), Tennis; then mob/pair a kata with someone and coach the cycles |

## Beyond katas

- [cyber-dojo.org](https://cyber-dojo.org) - browser-based katas with built-in red/green feedback
- [Exercism](https://exercism.org) - language tracks with mentoring
- [CodeWars](https://www.codewars.com) - practice problems; apply TDD even when the site does not require it

## References

- [Dave Thomas - Code Kata](https://codekata.com) (the original framing of katas for programmers)
