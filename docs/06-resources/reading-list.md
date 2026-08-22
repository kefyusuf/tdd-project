# Reading List

## TL;DR

- Start with Kent Beck's _Test-Driven Development: By Example_ - short, canonical, hands-on.
- Fowler's bliki and the Agile Alliance glossary are the best free references.
- The books below are grouped by purpose; you do not need all of them.

## Books - TDD core

| Book                                                      | Author            | Why read it                                                                                           |
| --------------------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------- |
| _Test-Driven Development: By Example_ (2003)              | Kent Beck         | The canonical walkthrough of the discipline; the source of red-green-refactor pedagogy                |
| _Unit Testing Principles, Practices, and Patterns_ (2020) | Vladimir Khorikov | Modern, opinionated treatment of what makes unit tests valuable; excellent on testability and mocking |
| _The Art of Unit Testing_ (3rd ed.)                       | Roy Osherove      | Pragmatic unit-testing craft with JS-flavored examples                                                |

## Books - testing craft and legacy code

| Book                                                       | Author                   | Why read it                                                                                                                                                     |
| ---------------------------------------------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _xUnit Test Patterns: Refactoring Test Code_ (2004)        | Gerard Meszaros          | The encyclopedia behind the [test doubles taxonomy](../03-testing-foundations/test-doubles.md); free summaries at [xunitpatterns.com](http://xunitpatterns.com) |
| _Working Effectively with Legacy Code_ (2004)              | Michael Feathers         | The definitive guide to getting code under test safely; source of "legacy code is code without tests"                                                           |
| _Growing Object-Oriented Software, Guided by Tests_ (2009) | Steve Freeman, Nat Pryce | The mockist/London-style classic; outside-in TDD on a real project                                                                                              |

## Books - design and craftsmanship

| Book                                                                 | Author           | Why read it                                              |
| -------------------------------------------------------------------- | ---------------- | -------------------------------------------------------- |
| _Refactoring: Improving the Design of Existing Code_ (2nd ed., 2018) | Martin Fowler    | The catalog behind the refactor step                     |
| _Clean Code_ (2008)                                                  | Robert C. Martin | Influential craftsmanship primer; read critically        |
| _Domain-Driven Design_ (2003)                                        | Eric Evans       | The "Blue Book" - strategic and tactical DDD foundations |
| _Implementing Domain-Driven Design_ (2013)                           | Vaughn Vernon    | More hands-on DDD than Evans for practitioners           |

## Books - process and delivery

| Book                              | Author                                | Why read it                                                                                       |
| --------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------- |
| _Specification by Example_ (2011) | Gojko Adzic                           | How successful teams do BDD/ATDD-style collaboration                                              |
| _Continuous Delivery_ (2010)      | Jez Humble, David Farley              | The deployment-pipeline bible behind [TDD in CI/CD](../04-engineering-culture/tdd-in-cicd.md)     |
| _Accelerate_ (2018)               | Nicole Forsgren, Jez Humble, Gene Kim | The research linking delivery practices to organizational outcomes ([dora.dev](https://dora.dev)) |

## Articles and canonical web sources

- [Kent Beck - Canon TDD](https://tidyfirst.substack.com/p/canon-tdd) - Beck's own current formulation
- [Martin Fowler - Test Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html) - the standard summary, updated 2023
- [Agile Alliance - TDD glossary entry](https://www.agilealliance.org/glossary/tdd/) - rules, benefits, pitfalls, skill levels
- [Martin Fowler - Mocks Aren't Stubs](https://martinfowler.com/articles/mocksArentStubs.html) - the classicist/mockist distinction
- [Martin Fowler - TestPyramid](https://martinfowler.com/bliki/TestPyramid.html)
- [Martin Fowler et al. - Is TDD Dead?](https://martinfowler.com/articles/is-tdd-dead/) - the 2014 debate series
- [Dan North - Introducing BDD](https://dannorth.net/introducing-bdd/)
- [Cucumber - BDD documentation](https://cucumber.io/docs/bdd/) - Discovery/Formulation/Automation
- [Kent C. Dodds - The Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
- [Google Testing Blog - Just Say No to More End-to-End Tests](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html)

## Official framework documentation

- [Vitest guide](https://vitest.dev/guide/)
- [Jest documentation](https://jestjs.io/docs/getting-started)
- [pytest documentation](https://docs.pytest.org/en/stable/)
- [unittest.mock - Python standard library](https://docs.python.org/3/library/unittest.mock.html)

## Practice platforms

- [cyber-dojo.org](https://cyber-dojo.org) - katas with red/green feedback in the browser
- [Exercism](https://exercism.org) - language tracks with mentoring
- [CodeWars](https://www.codewars.com) - apply TDD voluntarily to every exercise
- [ardalis/kata-catalog](https://github.com/ardalis/kata-catalog) - curated kata list

## Suggested reading order

1. _TDD by Example_ (Beck) - the loop
2. Fowler's bliki articles - vocabulary and context
3. _Unit Testing Principles..._ (Khorikov) - modern judgment
4. _Working Effectively with Legacy Code_ (Feathers) - real-world survival
5. Then branch by interest: DDD (Evans/Vernon), delivery (Humble/Farley), or BDD (Adzic)
