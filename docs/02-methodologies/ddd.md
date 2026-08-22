# DDD - Domain-Driven Design

## TL;DR

- DDD aligns code structure with the business domain through collaboration with domain experts.
- Strategic design: ubiquitous language, bounded contexts, context mapping.
- Tactical design: entities, value objects, aggregates, repositories, domain events, services.
- DDD is not a testing practice, but a well-factored domain model is the easiest code to TDD.
- Job signal: senior/architect roles and products with complex business rules.

## What DDD is

Eric Evans introduced Domain-Driven Design for software whose complexity lives
in the **business domain** - insurance, logistics, banking, healthcare - rather
than in technical challenges. The premise: the most reliable way to manage that
complexity is to make the code a direct, evolving expression of a rigorously
shared model of the business.

## Strategic design

| Concept             | Meaning                                                                                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ubiquitous language | One precise vocabulary shared by experts and developers, used in conversations, docs, and code identifiers alike                                        |
| Bounded context     | An explicit boundary (module/service/team) inside which one model and its language are consistent - "Order" means different things in Sales vs Shipping |
| Context mapping     | Deliberate documentation of how bounded contexts exchange data and which upstream/downstream relationships exist                                        |

Fowler's bliki entries on [Ubiquitous Language](https://martinfowler.com/bliki/UbiquitousLanguage.html)
and [Bounded Context](https://martinfowler.com/bliki/BoundedContext.html) are
the standard short references.

## Tactical design patterns

| Pattern        | Role                                                   | Testability note                                 |
| -------------- | ------------------------------------------------------ | ------------------------------------------------ |
| Entity         | Object with identity that persists over time           | Equality by ID; TDD lifecycle rules              |
| Value object   | Immutable, interchangeable by value (`Money`, `Email`) | Pure functions - ideal TDD targets               |
| Aggregate      | Consistency boundary; root entity guarding invariants  | TDD the invariants through the root's public API |
| Repository     | Collection-like access to aggregates                   | Interface + in-memory fake for tests             |
| Domain event   | "Something happened" record (OrderPlaced)              | TDD side-effect publication at boundaries        |
| Domain service | Domain logic that doesn't belong to one entity         | Pure orchestration - easy unit tests             |

## Why DDD and TDD pair well

Tactical DDD produces exactly the kind of code TDD thrives on: small pure value
objects, aggregates whose invariants are asserted through public methods, and
infrastructure pushed behind interfaces. The [test doubles](../03-testing-foundations/test-doubles.md)
you need shrink to a handful of fakes (repositories, gateways), and the
ubiquitous language gives test names their vocabulary:

```python
def test_order_cannot_exceed_available_credit():
    order = Order(customer_id=CustomerId("c-1"), limit=Money(500))
    with pytest.raises(CreditExceeded):
        order.add_line(Money(600))
```

```ts
it("rejects an order line that exceeds the customer credit limit", () => {
  const order = new Order({ customerId: "c-1", creditLimit: Money.eur(500) });
  expect(() => order.addLine(Money.eur(600))).toThrow(CreditExceeded);
});
```

## When DDD pays off - and when it doesn't

| Good fit                                   | Poor fit                        |
| ------------------------------------------ | ------------------------------- |
| Complex, evolving business rules           | Mostly CRUD over stable schemas |
| Long-lived core product                    | Short-lived internal tools      |
| Domain experts available for collaboration | No access to business knowledge |
| Multiple teams/contexts sharing vocabulary | Single small module             |

Applying tactical patterns to a simple CRUD app adds ceremony without benefit -
a recognized anti-pattern.

## Learning path

1. Strategic concepts first (language, contexts) - highest value, no code needed.
2. Value objects and aggregates in a side project with TDD.
3. Context mapping when integrating multiple systems.

## Job market note

"DDD" appears in senior backend and architect postings, especially in finance,
logistics, and enterprise products. Recruiters usually mean familiarity with the
tactical patterns and bounded-context thinking. See the
[Job Market Analysis](../05-career/job-market-analysis.md).

## References

- Eric Evans, _Domain-Driven Design_ (the "Blue Book") - see [Reading List](../06-resources/reading-list.md)
- Vaughn Vernon, _Implementing Domain-Driven Design_ - see [Reading List](../06-resources/reading-list.md)
- [Martin Fowler - Bounded Context](https://martinfowler.com/bliki/BoundedContext.html)
- [Martin Fowler - Ubiquitous Language](https://martinfowler.com/bliki/UbiquitousLanguage.html)
