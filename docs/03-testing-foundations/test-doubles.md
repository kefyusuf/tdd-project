# Test Doubles

## TL;DR

- Meszaros taxonomy: dummy, fake, stub, spy, mock - "test double" is the umbrella term.
- State verification (assert outcomes) vs interaction verification (assert calls) is the core distinction.
- Use doubles freely for slow/external dependencies; sparingly inside domain logic.
- Over-mocking couples tests to implementation and destroys refactoring safety.

## The five kinds

| Double | Purpose                                                     | Verification style      |
| ------ | ----------------------------------------------------------- | ----------------------- |
| Dummy  | Fills a parameter list; never used                          | None                    |
| Fake   | Working lightweight implementation (in-memory DB/repo)      | State                   |
| Stub   | Returns canned answers to inputs                            | State of SUT after call |
| Spy    | A stub that records calls for later inspection              | Interaction             |
| Mock   | Pre-programmed with expected interactions; fails if not met | Interaction             |

Rule of thumb: if you care about **what came out**, use a fake/stub and assert
state; if you care about **that a side effect was triggered** (email sent,
gateway charged), use a spy/mock.

## Example - state verification with a fake/stub

Testing `PricingService` discount logic with a stubbed customer source:

```ts
import { describe, expect, it, vi } from "vitest";

it("gives premium customers a 10% discount", () => {
  const customerSource = { find: vi.fn().mockReturnValue({ tier: "premium" }) };
  const service = new PricingService(customerSource);

  const price = service.priceFor("cust-1", 100);

  expect(price).toBe(90);
});
```

```python
from unittest.mock import Mock


def test_gives_premium_customers_a_ten_percent_discount():
    customer_source = Mock()
    customer_source.find.return_value = {"tier": "premium"}
    service = PricingService(customer_source)

    price = service.price_for("cust-1", 100)

    assert price == 90
```

The assertion is on the outcome (`price`), not on how the collaborator was used.

## Example - interaction verification at a boundary

Charging a payment gateway is a side effect with no return value to assert:

```ts
it("charges the gateway exactly once for the order total", () => {
  const gateway = { charge: vi.fn() };
  const service = new Checkout(gateway);

  service.complete({ total: 100 });

  expect(gateway.charge).toHaveBeenCalledTimes(1);
  expect(gateway.charge).toHaveBeenCalledWith(100);
});
```

```python
def test_charges_gateway_exactly_once_for_order_total():
    gateway = Mock()
    service = Checkout(gateway)

    service.complete(total=100)

    gateway.charge.assert_called_once_with(100)
```

This is legitimate mocking: an architectural boundary you cannot observe
otherwise in a unit test.

## When NOT to mock

- **Domain logic collaborators.** A `Money` or `OrderLines` object is cheap to
  construct for real; mocking it verifies nothing and breaks on refactor.
- **Value objects / pure functions.** Just call them.
- **Everything "for isolation".** Isolation from _slowness_ is the goal, not
  isolation from _your own classes_.

Consequence checklist for a suspicious suite: tests break when refactoring
without behavior change? Multiple mocks per test? Test names mention private
methods? You are testing structure, not behavior - see
[Common Pitfalls](../01-tdd/common-pitfalls.md).

## Framework mapping

| Concept                 | Vitest/Jest                           | pytest                              |
| ----------------------- | ------------------------------------- | ----------------------------------- |
| Create double           | `vi.fn()` / `jest.fn()`               | `unittest.mock.Mock`                |
| Canned return           | `.mockReturnValue(x)`                 | `mock.return_value = x`             |
| Side-effect answers     | `.mockImplementation(f)`              | `mock.side_effect = f`              |
| Assert called once with | `.toHaveBeenCalledWith(...)`          | `mock.assert_called_once_with(...)` |
| Replace module/class    | `vi.mock("...")` / `jest.mock("...")` | `monkeypatch.setattr(...)`          |

Full syntax in the cheat sheets: [Vitest/Jest](framework-cheatsheets/vitest-jest.md),
[pytest](framework-cheatsheets/pytest.md).

## References

- [Martin Fowler - Mocks Aren't Stubs](https://martinfowler.com/articles/mocksArentStubs.html)
- Gerard Meszaros, _xUnit Test Patterns_ - see [Reading List](../06-resources/reading-list.md)
