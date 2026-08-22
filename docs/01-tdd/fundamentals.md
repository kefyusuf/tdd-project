# TDD Fundamentals

## TL;DR

- TDD is a programming discipline where short cycles of writing a failing test, making it pass, and refactoring drive development.
- It was popularized by Kent Beck in the late 1990s as part of Extreme Programming.
- The three rules: write the test first, write only enough code to pass, refactor continuously.
- Benefits reported by teams include lower defect rates and improved design quality.
- Writing the test first forces you to design the interface before the implementation.

## What TDD is

Test-Driven Development is a technique for building software that guides
development by writing tests. As Martin Fowler summarizes it, you follow three
steps repeatedly:

1. Write a test for the next bit of functionality you want to add.
2. Write the functional code until the test passes.
3. Refactor both new and old code until it is clean.

The Agile Alliance describes the same loop as tightly interwoven coding,
testing, and designing activities:

- Write a single unit test describing one aspect of the program.
- Run it; it must fail because the feature does not exist yet.
- Write just enough code - the simplest possible - to make it pass.
- Refactor until the code meets simplicity criteria.
- Repeat, accumulating tests over time.

## The three laws (Uncle Bob)

Robert C. Martin formalizes the discipline as three laws that make "test-first"
unbreakable:

1. Write no production code except to make a failing test pass.
2. Write no more of a test than is sufficient to fail - compile errors count as failure.
3. Write no more production code than is sufficient to pass the currently failing test.

## A brief history

| Year      | Milestone                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------- |
| 1976      | Glenford Myers publishes _Software Reliability_ - the era of "developers shouldn't test their own code" |
| 1994      | Kent Beck writes SUnit, the Smalltalk unit testing framework                                            |
| 1998      | An Extreme Programming article states "we usually write the test first"                                 |
| 1998-2002 | "Test First" elaborated into "Test Driven" on the C2 wiki                                               |
| 2000      | Mock Objects techniques emerge                                                                          |
| 2003      | Kent Beck publishes _Test-Driven Development: By Example_                                               |

(Source: Agile Alliance TDD glossary.)

## Expected benefits

Per the Agile Alliance's summary of practitioner experience:

- **Fewer defects** - many teams report significant reductions in defect rates,
  at the cost of moderate initial effort increase.
- **Lower late-phase cost** - overheads are typically offset by reduced effort
  in projects' final phases.
- **Better internal quality** - veteran practitioners consistently report
  improved cohesion/coupling metrics and overall design quality.

## What TDD is not

- **Not "having tests".** Tests written after the code verify behavior but do not drive design.
- **Not a QA activity.** TDD is a developer discipline; separate QA testing still exists above it.
- **Not coverage theater.** The point is behavioral confidence and design feedback, not a percentage.
- **Not dogma.** Exploratory spikes are often written without tests first, then brought under test when they graduate into real features.

## Where to go next

- See the loop in action with code: [Red, Green, Refactor](red-green-refactor.md)
- Learn the craft rules: [Best Practices](best-practices.md)

## References

- [Martin Fowler - Test Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
- [Agile Alliance - TDD glossary entry](https://www.agilealliance.org/glossary/tdd/)
- Kent Beck, _Test-Driven Development: By Example_ (2003) - see [Reading List](../06-resources/reading-list.md)
