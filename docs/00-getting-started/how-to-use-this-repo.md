# How to Use This Repo

## TL;DR

- Pick a learning path based on your goal: learn, interview, or lead.
- Every document follows the same anatomy: TL;DR, body, examples, mistakes, references.
- This repo contains no runnable code - copy snippets into your own scratch project while reading.
- Practice with katas; reading alone will not build the red-green-refactor reflex.

## Prerequisites

- Basic programming experience in TypeScript/JavaScript or Python
- Familiarity with running commands in a terminal
- For hands-on practice: Node.js 18+ or Python 3.10+ installed locally

## Learning paths

| Goal                   | Order                                                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Learn TDD from zero    | Why Testing Matters → TDD Fundamentals → Red, Green, Refactor → Best Practices → Common Pitfalls → pick a kata and practice daily |
| Prepare for interviews | Core TDD section → Test Doubles → framework cheat sheet for your stack → Interview Preparation → timed kata sessions              |
| Align a team           | Methodologies Overview → Agile and XP → TDD in CI/CD → Job Market Analysis; use the Glossary as shared vocabulary                 |

## Anatomy of every guide

1. **TL;DR** - five bullets or fewer; read this to decide whether to continue.
2. **Body** - concept first, then why it matters, then a worked example.
3. **Common mistakes** - the failure modes practitioners actually hit.
4. **References** - authoritative sources so you can verify claims yourself.

Code examples appear in both ecosystems:

| Ecosystem               | Test runner                       | Example location                     |
| ----------------------- | --------------------------------- | ------------------------------------ |
| TypeScript / JavaScript | Vitest (API-compatible with Jest) | ` ```ts ` blocks throughout docs     |
| Python                  | pytest                            | ` ```python ` blocks throughout docs |

## How to practice

1. Create a throwaway folder outside this repo (`mkdir tdd-practice && cd tdd-practice`).
2. Initialize it with your runner ([Vitest cheat sheet](../03-testing-foundations/framework-cheatsheets/vitest-jest.md) or [pytest cheat sheet](../03-testing-foundations/framework-cheatsheets/pytest.md)).
3. Follow [Red, Green, Refactor](../01-tdd/red-green-refactor.md) using a kata from the [catalog](../03-testing-foundations/katas.md).
4. Timebox sessions to 30-45 minutes; stop mid-cycle if needed and note where to resume.

## Conventions used here

- **SUT** ("system under test") refers to the code being tested.
- Snippets are minimal on purpose; they demonstrate the technique, not production completeness.
- External links point only to sources consulted while writing; report dead links via an issue.

## Next step

Start with [Why Testing Matters](why-testing-matters.md), then commit to your
first kata session this week - the skill is built by repetition, not reading.
