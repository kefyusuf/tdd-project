# TDD Best Practices

## TL;DR

- Make tests **FIRST**: Fast, Independent, Repeatable, Self-validating, Timely.
- Structure every test as Arrange-Act-Assert and name it after the behavior.
- Take baby steps: one test, one behavior, then green.
- Test behavior through the public interface, not implementation details.
- Keep the suite fast - speed is a feature that determines whether TDD survives.

## FIRST properties

| Property        | Meaning                            | Practical rule                                    |
| --------------- | ---------------------------------- | ------------------------------------------------- |
| Fast            | Milliseconds, not seconds          | Unit tests run on every keystroke of development  |
| Independent     | No shared state or ordering        | Any test passes alone and with the whole suite    |
| Repeatable      | Same result on any machine         | No network, clock, locale, or random dependencies |
| Self-validating | Pass/fail without human inspection | Assertions inside the test, never "looks right"   |
| Timely          | Written at the right moment        | In TDD: before the production code                |

(After Ottinger & Langr's formulation.)

## Arrange-Act-Assert (AAA)

Keep three visibly separated sections; blank lines are enough.

```ts
it("applies a discount for premium customers", () => {
  // Arrange
  const order = new Order({ total: 100 });
  const customer = new Customer({ tier: "premium" });

  // Act
  const payable = checkout(order, customer);

  // Act/Assert boundary visible
  expect(payable).toBe(90);
});
```

```python
def test_applies_discount_for_premium_customers():
    # Arrange
    order = Order(total=100)
    customer = Customer(tier="premium")

    # Act
    payable = checkout(order, customer)

    # Assert
    assert payable == 90
```

One behavior per test. If you need the word "and" in the test name, split it.

## Naming that documents behavior

Prefer `unit_behavior_expectation` sentences over method-name mirrors:

- Good: `rejects_expired_credit_cards`, `returns_zero_for_empty_cart`
- Weak: `testProcess`, `test_validate_1`

The test name is the first line of your documentation when it fails in CI.

## Baby steps and the test list

- Write **one** test at a time; resist batching three asserts for three behaviors.
- Maintain a running test list ([Red, Green, Refactor](red-green-refactor.md)); park ideas instead of implementing them early.
- Prefer many small cycles over few large ones - small cycles fail small.

## Test behavior, not implementation

Assert observable outcomes through public APIs. Tests that reach into private
methods or verify exact call sequences for everything break on every refactor,
which defeats refactoring's purpose. Use interaction testing (mocks) only at
architectural boundaries - see [Test Doubles](../03-testing-foundations/test-doubles.md).

Classicist vs mockist: classic/Detroit-style TDD verifies end state with real
collaborators where practical; London/mockist style doubles all collaborators.
Both are legitimate; classicism tends to produce more refactor-tolerant suites
for domain logic.

## Speed discipline

- Keep the whole unit suite under a few seconds; keep single tests under ~100 ms.
- Push slow checks down the pyramid to integration/E2E layers - see [The Test Pyramid](../03-testing-foundations/test-pyramid.md).
- Replace I/O with fakes at boundaries (in-memory repositories, filesystem fakes).

## Refactor relentlessly

Refactoring is not optional cleanup after the fact - it is one third of the
cycle. On green, ask: duplicated code? misleading names? long functions? Fix it
now while the test net is fresh. See [Clean Code and Refactoring](../04-engineering-culture/clean-code-refactoring.md).

## Quick self-checklist

- [ ] Every test has exactly one reason to fail
- [ ] Names read as behavioral sentences
- [ ] Suite runs in seconds
- [ ] No test depends on another test or execution order
- [ ] Green phase always ends with a refactor pass

## References

- [Agile Alliance - TDD glossary](https://www.agilealliance.org/glossary/tdd/)
- Kent Beck, _Test-Driven Development: By Example_ - see [Reading List](../06-resources/reading-list.md)
