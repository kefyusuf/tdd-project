# TDD & Software Development Methodologies - A Practical Guide

[![Docs CI](https://github.com/kefyusuf/tdd-project/actions/workflows/docs-ci.yml/badge.svg)](https://github.com/kefyusuf/tdd-project/actions/workflows/docs-ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

A documentation-first, English-language learning repository about
**Test-Driven Development (TDD)** and the methodologies that surround it - BDD,
ATDD, DDD, the testing pyramid, and the engineering culture that makes them work
in real teams.

The scope is evidence-driven: chapters map to what software job postings
actually ask for. See the [Job Market Analysis](docs/05-career/job-market-analysis.md)
for the documented reasoning.

## Who this is for

- Developers who want to learn TDD properly, not just the acronym
- Candidates preparing for testing-focused technical interviews
- Teams looking for a shared reference to align vocabulary and practices

## Learning paths

| Path               | Recommended order                                                                                                                                                                                                                                                                                   |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Beginner           | [Why Testing Matters](docs/00-getting-started/why-testing-matters.md) → [TDD Fundamentals](docs/01-tdd/fundamentals.md) → [Red, Green, Refactor](docs/01-tdd/red-green-refactor.md) → [Best Practices](docs/01-tdd/best-practices.md) → practice with [Katas](docs/03-testing-foundations/katas.md) |
| Interview prep     | Core TDD section → [Test Doubles](docs/03-testing-foundations/test-doubles.md) → [Interview Preparation](docs/05-career/interview-prep.md) → katas under time pressure                                                                                                                              |
| Team lead / senior | [Methodologies Overview](docs/02-methodologies/overview.md) → [Agile and XP](docs/04-engineering-culture/agile-and-xp.md) → [TDD in CI/CD](docs/04-engineering-culture/tdd-in-cicd.md) → [Job Market Analysis](docs/05-career/job-market-analysis.md)                                               |

## Contents

- **Getting started**
  - [Why Testing Matters](docs/00-getting-started/why-testing-matters.md)
  - [How to Use This Repo](docs/00-getting-started/how-to-use-this-repo.md)
  - [Glossary](docs/00-getting-started/glossary.md)
- **Core TDD**
  - [Fundamentals](docs/01-tdd/fundamentals.md)
  - [Red, Green, Refactor](docs/01-tdd/red-green-refactor.md)
  - [Best Practices](docs/01-tdd/best-practices.md)
  - [Common Pitfalls](docs/01-tdd/common-pitfalls.md)
  - [Skill Levels](docs/01-tdd/skill-levels.md)
  - [FAQ](docs/01-tdd/faq.md)
- **Related methodologies**
  - [Overview & Comparison Matrix](docs/02-methodologies/overview.md)
  - [BDD - Behavior-Driven Development](docs/02-methodologies/bdd.md)
  - [ATDD - Acceptance Test-Driven Development](docs/02-methodologies/atdd.md)
  - [DDD - Domain-Driven Design](docs/02-methodologies/ddd.md)
- **Testing foundations**
  - [The Test Pyramid](docs/03-testing-foundations/test-pyramid.md)
  - [Test Doubles](docs/03-testing-foundations/test-doubles.md)
  - [Vitest/Jest Cheat Sheet](docs/03-testing-foundations/framework-cheatsheets/vitest-jest.md)
  - [pytest Cheat Sheet](docs/03-testing-foundations/framework-cheatsheets/pytest.md)
  - [Kata Catalog](docs/03-testing-foundations/katas.md)
- **Engineering culture**
  - [Agile and XP](docs/04-engineering-culture/agile-and-xp.md)
  - [Clean Code and Refactoring](docs/04-engineering-culture/clean-code-refactoring.md)
  - [TDD in CI/CD Pipelines](docs/04-engineering-culture/tdd-in-cicd.md)
- **Career**
  - [Job Market Analysis](docs/05-career/job-market-analysis.md)
  - [Interview Preparation](docs/05-career/interview-prep.md)
- **Resources**
  - [Reading List](docs/06-resources/reading-list.md)

## How the docs are written

Every guide follows the same anatomy: a short TL;DR, the concept, why it
matters, an example (TypeScript **and** Python where code helps), common
mistakes, and references to authoritative sources. Terminology is centralized
in the [Glossary](docs/00-getting-started/glossary.md).

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) and
our [Code of Conduct](CODE_OF_CONDUCT.md). Documentation changes run through
CI: markdownlint, Prettier, and automated link checking keep content healthy.

## License

Distributed under the [MIT License](LICENSE).
