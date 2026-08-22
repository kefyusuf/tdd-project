# Agile and XP - Where TDD Lives

## TL;DR

- TDD was born inside Extreme Programming (XP); it is an engineering practice, not a management framework.
- Scrum and Kanban organize work; XP practices like TDD, refactoring, and CI protect quality inside that work.
- "Definition of Done" is where testing discipline gets enforced in agile processes.
- Job ads assume agile fluency almost universally; engineering-practice keywords (TDD, CI) differentiate candidates.

## The Agile Manifesto in one table

Agile values ([agilemanifesto.org](https://agilemanifesto.org)):

| Values over                  | Without discarding          |
| ---------------------------- | --------------------------- |
| Individuals and interactions | Processes and tools         |
| Working software             | Comprehensive documentation |
| Customer collaboration       | Contract negotiation        |
| Responding to change         | Following a plan            |

TDD serves the second row directly: short cycles keep software working while
requirements move.

## The three frameworks teams actually mention in job ads

| Framework | Core idea                                        | Typical ceremonies/artifacts                                                     |
| --------- | ------------------------------------------------ | -------------------------------------------------------------------------------- |
| Scrum     | Fixed-length sprints with committed goals        | Sprint planning, daily standup, review, retrospective                            |
| Kanban    | Continuous flow, WIP limits, visualize the board | Board, cycle-time metrics                                                        |
| XP        | Engineering discipline for sustainable pace      | TDD, pair programming, continuous integration, refactoring, collective ownership |

([Scrum Guide](https://scrumguides.org/scrum-guide.html), Atlassian's
[agile developer guides](https://www.atlassian.com/agile/software-development).)

The common misreading: treating Scrum as sufficient for quality. Scrum says
_when_ to deliver increments; XP says _how_ to keep them changeable. A team
without XP-style practices accumulates [technical debt](../04-engineering-culture/clean-code-refactoring.md)
regardless of ceremony.

## XP practices most relevant here

- **Test-first programming** - this repository's core subject.
- **Refactoring** - continuous design cleanup; pairs with TDD's green phase.
- **Continuous integration** - merge small, verify constantly; see [TDD in CI/CD](tdd-in-cicd.md).
- **Pair programming / collective code ownership** - spreads TDD skill through the team.
- **Sustainable pace** - slow suites and flaky tests destroy it.

## Where testing discipline attaches to process

| Process moment     | Testing practice                                                                |
| ------------------ | ------------------------------------------------------------------------------- |
| Backlog refinement | Acceptance criteria written as examples ([ATDD](../02-methodologies/atdd.md))   |
| Story kickoff      | Discovery conversation on ambiguous stories ([BDD](../02-methodologies/bdd.md)) |
| In-progress story  | Red-green-refactor cycles ([TDD](../01-tdd/fundamentals.md))                    |
| Pull request       | Suite runs in CI; review checks test names and coverage of behavior             |
| Definition of Done | Includes: acceptance tests green, no skipped tests, suite time within budget    |

Example DoD line items that make TDD real rather than aspirational:

- Every bug fix ships with a reproducing test written first
- Unit suite completes locally in under 10 seconds per module
- No new code merges while the main branch is red

## Interview angle

Expect questions connecting process and practice: "How does your testing fit
into a sprint?" Strong answers describe concrete mechanics (DoD items, PR gates,
kata-driven onboarding), not framework vocabulary. See
[Interview Preparation](../05-career/interview-prep.md).

## References

- [Agile Alliance - XP glossary entry](https://www.agilealliance.org/glossary/xp/)
- [Scrum Guide](https://scrumguides.org/scrum-guide.html)
- [Atlassian - Agile software development](https://www.atlassian.com/agile/software-development)
