# Job Market Analysis

## TL;DR

- TDD/unit testing is the most frequently demanded testing methodology in developer job ads.
- Agile/Scrum fluency and CI/CD are near-universal baseline expectations.
- BDD appears concentrated in QA-automation roles; DDD in senior/architect roles.
- This repo's scope was chosen from these signals - the mapping table below documents the reasoning.

> Scope note: this page records the evidence used to structure the repository
> (researched August 2026). Percentages vary by market and role level - treat
> this as directional, not statistical. Sources consulted: Martin Fowler's TDD
> writings, the Agile Alliance glossary, Cucumber documentation, Atlassian agile
> guides, and the Stack Overflow Developer Survey 2024 technology section.

## Signals to scope mapping

| Job-ad signal                           | Frequency          | Where it appears most                          | Repo coverage                                                                                                        |
| --------------------------------------- | ------------------ | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Unit testing / TDD                      | Very high          | Backend, fullstack, mid-senior roles           | Core section ([01-tdd](../01-tdd/fundamentals.md))                                                                   |
| Testing pyramid / test types vocabulary | High               | Roles mentioning "test automation" or CI       | [Test Pyramid](../03-testing-foundations/test-pyramid.md), [Test Doubles](../03-testing-foundations/test-doubles.md) |
| Agile / Scrum participation             | Near-universal     | All roles                                      | [Agile and XP](../04-engineering-culture/agile-and-xp.md)                                                            |
| CI/CD pipelines                         | High               | Most professional roles                        | [TDD in CI/CD](../04-engineering-culture/tdd-in-cicd.md)                                                             |
| Clean code / SOLID / refactoring        | High (mid-senior)  | Backend, platform teams                        | [Clean Code and Refactoring](../04-engineering-culture/clean-code-refactoring.md)                                    |
| BDD / Cucumber / Gherkin                | Medium             | QA automation, some backend                    | [BDD](../02-methodologies/bdd.md)                                                                                    |
| DDD                                     | Medium-low by name | Senior/architect, domain-heavy products        | [DDD](../02-methodologies/ddd.md)                                                                                    |
| ATDD (by name)                          | Low                | Usually folded into "acceptance criteria" talk | [ATDD](../02-methodologies/atdd.md)                                                                                  |

## Why TDD is the core

- It is named explicitly far more often than any related practice ("experience with TDD", "strong unit testing background").
- Interview processes operationalize it: live red-green-refactor exercises are a common seniority filter.
- The surrounding keywords recruiters scan for - Jest/Vitest/pytest, mocking,
  coverage, CI - all assume the discipline this repo teaches.

Framework context from the Stack Overflow 2024 survey: JavaScript remains the
most-used language overall and Node.js the top web technology (40.8%), which is
why examples here use TypeScript alongside Python - the two ecosystems where a
learner gets maximum interview overlap per hour invested. Test tooling follows:
Jest/Vitest for TS/JS, pytest for Python dominate their ecosystems.

## Per-role cheat sheet

| Role                   | What ads typically list                         | What to be ready to demonstrate                     |
| ---------------------- | ----------------------------------------------- | --------------------------------------------------- |
| Frontend               | Component testing, Jest/Vitest, E2E basics      | A tested component with mocked network layer        |
| Backend                | Unit + integration testing, TDD, contract tests | Live TDD on business logic with fakes at boundaries |
| Fullstack              | Both of the above plus CI familiarity           | Pyramid reasoning: what to test where               |
| QA / SDET              | BDD/Cucumber, Playwright/Selenium, API testing  | Gherkin scenario design and stable automation       |
| Senior/staff/architect | DDD vocabulary, legacy refactoring, mentoring   | Boundary drawing, characterization-test strategy    |

## Resume and profile phrasing

Weak: "Familiar with TDD concepts."
Strong: "Practiced test-driven development (red-green-refactor) in production TypeScript services using Vitest; enforced suite time budgets in CI; introduced test-first bug-fixing policy."

The strong version names the practice, the artifact, and the team-level effect
- exactly the three tiers described in [Skill Levels](../01-tdd/skill-levels.md).

## How to keep this analysis honest

1. Re-run keyword scans against current postings in your target market periodically.
2. Weight _how_ a term appears: "required" beats "nice to have"; seniority modifiers matter.
3. Prefer primary signals (the ad text) over aggregator summaries.

Improvements welcome via PR - see [CONTRIBUTING](../../CONTRIBUTING.md).

## References

- [Stack Overflow Developer Survey 2024 - Technology](https://survey.stackoverflow.co/2024/technology)
- [Atlassian - Agile software development](https://www.atlassian.com/agile/software-development)
