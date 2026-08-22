# Clean Code and Refactoring

## TL;DR

- Refactoring - restructuring code without changing behavior - is one third of the TDD cycle, not an afterthought.
- Clean-code traits: meaningful names, small functions, single responsibilities, minimal surprise.
- SOLID and code smells are the shared vocabulary for spotting what to fix on green.
- Technical debt is the compounding cost of skipping that cleanup; tests are how you pay it down safely.

## Refactoring inside the TDD loop

The green phase produces working code that is allowed to be ugly. The refactor
phase makes it clean **while the test net is fresh**. This ordering is the
discipline's safety mechanism:

1. Red - a failing test pins the required behavior.
2. Green - simplest implementation, duplication tolerated.
3. Refactor - remove duplication (including between test and production code), improve names, extract functions. Tests stay green throughout.

Without step 3 you accumulate "tests-first spaghetti" - see
[Common Pitfalls](../01-tdd/common-pitfalls.md).

## What "clean" means in practice

| Principle                    | One-line rule                                         |
| ---------------------------- | ----------------------------------------------------- |
| Meaningful names             | Names reveal intent: `overdueInvoiceCount`, not `cnt` |
| Small functions              | One level of abstraction per function; few parameters |
| Single responsibility        | Each module changes for exactly one reason            |
| Minimal surprise             | Same concept, same name, everywhere                   |
| Guard clauses / early return | Flatten nesting; happy path stays visible             |

## SOLID in brief

| Letter | Principle             | Practical smell it prevents                  |
| ------ | --------------------- | -------------------------------------------- |
| S      | Single responsibility | God classes touched by every ticket          |
| O      | Open/closed           | Switch-statement growth for every new type   |
| L      | Liskov substitution   | Subclasses breaking caller assumptions       |
| I      | Interface segregation | Fat interfaces forcing empty implementations |
| D      | Dependency inversion  | Business logic hard-wired to infrastructure  |

Dependencies inverted at boundaries are also what makes
[test doubles](../03-testing-foundations/test-doubles.md) possible without
`vi.mock`/monkeypatch gymnastics.

## Code smells worth learning first

- Duplicated code - extract function/class
- Long function - decompose by abstraction level
- Data clumps - group into value objects ([DDD tactical patterns](../02-methodologies/ddd.md) formalize this)
- Primitive obsession - `Money` instead of raw floats for currency
- Feature envy - logic living far from its data
- Shotgun surgery - one change scattered over many files

Full catalog at [refactoring.guru](https://refactoring.guru/refactoring/smells)
and Fowler's [CodeSmell bliki entry](https://martinfowler.com/bliki/CodeSmell.html).

## Technical debt

Ward Cunningham's metaphor: taking shortcuts to ship now creates a _debt_ whose
interest is every future change slowed down and risked by the shortcut.
Fowler's [TechnicalDebt quadrant](https://martinfowler.com/bliki/TechnicalDebtQuadrant.html)
distinguishes deliberate vs inadvertent, reckless vs prudent debt. Two rules
keep debt survivable:

1. Never take a shortcut through untested territory - the TDD net is what makes repayment safe.
2. Schedule repayment: refactoring work belongs in sprint planning, not just "someday".

Agile teams treat maintainability as a product feature rather than overhead -
see Atlassian's developer-practice guidance in
[Agile and XP](agile-and-xp.md).

## The boy scout rule

Leave the code cleaner than you found it. Under continuous refactoring this
compounds: every touched file improves slightly, and the codebase never needs a
heroic "big rewrite".

## References

- [Martin Fowler - Test Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
- [Agile Alliance - Refactoring glossary entry](https://www.agilealliance.org/glossary/refactoring/)
- Robert C. Martin, _Clean Code_; Martin Fowler, _Refactoring_ - see [Reading List](../06-resources/reading-list.md)
