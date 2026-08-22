# BDD - Behavior-Driven Development

## TL;DR

- BDD is a team collaboration practice built on concrete examples of behavior - not a testing tool.
- Day-to-day BDD is three iterative practices: Discovery, Formulation, Automation (Cucumber's framing).
- Given/When/Then scenarios become executable specifications and living documentation.
- The most common failure is adopting Gherkin tooling without the discovery conversations.
- Job signal: QA automation roles and some backend roles; pairs with TDD rather than replacing it.

## Origin and definition

Dan North introduced BDD while teaching TDD: phrases like "test" created
confusion about what developers were actually doing - specifying **behavior**.
BDD generalizes that insight to the whole team: use concrete, real-world
examples to agree on what the system should do before building it.

Cucumber's documentation frames daily BDD as three practices:

1. **Discovery - what it _could_ do.** Structured conversations (discovery
   workshops) exploring the story through examples from the user's perspective.
2. **Formulation - what it _should_ do.** Document agreed examples in a form
   that can be automated, and check everyone still agrees.
3. **Automation - what it _actually does_.** Implement each example, starting
   with an automated test guiding the code.

## A formulated example (Gherkin)

```gherkin
Feature: Checkout discounts

  Scenario: Premium customer receives loyalty discount
    Given a premium customer "Ada"
    And a cart containing:
      | item | price |
      | Book | 100   |
    When she checks out
    Then she pays 90
```

The scenario language is deliberately business-readable. Developers wire each
step ("Given a premium customer...") to test code; inside those step
implementations they work in normal [TDD cycles](../01-tdd/red-green-refactor.md).

## Three Amigos

The discovery conversation combines three perspectives:

| Perspective        | Brings                                          |
| ------------------ | ----------------------------------------------- |
| Product / business | Why the feature matters, acceptance intent      |
| Development        | Feasibility, edge cases, technical constraints  |
| Quality / testing  | Failure modes, boundary conditions, testability |

When the three perspectives can't agree on an example, that ambiguity is the
finding - better surfaced now than after implementation.

## BDD vs TDD

|                  | TDD                | BDD                                                  |
| ---------------- | ------------------ | ---------------------------------------------------- |
| Scope            | One unit at a time | One behavior/scenario at a time                      |
| Primary audience | Developer          | Whole team                                           |
| Language         | Code               | Business-readable examples (often Gherkin)           |
| Artifact         | Unit test suite    | Executable specification / living documentation      |
| Relationship     | -                  | Contains TDD-style cycles inside each automated step |

## Common misconceptions

- **"BDD = installing Cucumber."** Tooling is the third practice. Without
  discovery workshops, you get expensive brittle scenarios nobody reads.
- **"Every test should be Gherkin."** Gherkin belongs at the acceptance layer;
  unit tests stay in code.
- **"BDD replaces unit testing."** It layers above it - see the
  [comparison matrix](overview.md).

## Adoption guidance

Start with discovery: take one upcoming user story, list concrete examples as a
team, and notice how many questions surface. Only add automation tooling when
formulated examples are stable. Tools by ecosystem:

- JavaScript/TypeScript: Cucumber.js, Playwright + Gherkin
- Python: Behave, pytest-bdd

## Job market note

BDD appears most often in QA/test-automation job ads (Cucumber/Selenium stacks)
and in backend ads at companies with strong product-collaboration cultures.
Developers who can _run_ a discovery conversation are rarer - and more
valuable - than those who can only write Gherkin syntax. See the
[Job Market Analysis](../05-career/job-market-analysis.md).

## References

- [Cucumber - Behaviour-Driven Development](https://cucumber.io/docs/bdd/)
- [Dan North - Introducing BDD](https://dannorth.net/introducing-bdd/)
- [Agile Alliance glossary](https://www.agilealliance.org/glossary/tdd/)
