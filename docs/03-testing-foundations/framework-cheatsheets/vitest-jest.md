# Vitest / Jest Cheat Sheet

## TL;DR

- Vitest is API-compatible with Jest for most unit-testing needs; snippets below run on both.
- Core loop: `describe` groups, `it`/`test` cases, `expect` assertions.
- Hooks (`beforeEach`, etc.) replace shared mutable setup; `it.each` covers data-driven cases.
- Mocking: `vi.fn()` for doubles, `vi.mock()` for module replacement.

## Setup (Vitest)

```bash
npm install -D vitest
```

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
  },
});
```

```json
// package.json
{ "scripts": { "test": "vitest run", "test:watch": "vitest" } }
```

Jest equivalent: `npm install -D jest @types/jest` and `npx jest --init`.

## Anatomy

```ts
import { beforeEach, describe, expect, it } from "vitest";
import { Cart } from "./cart";

describe("Cart", () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart();
  });

  it("starts empty", () => {
    expect(cart.itemCount).toBe(0);
  });

  it("totals the price of added items", () => {
    cart.add({ name: "Book", price: 30 });
    cart.add({ name: "Pen", price: 2 });

    expect(cart.total).toBe(32);
  });
});
```

## Essential matchers

| Matcher                         | Checks                            |
| ------------------------------- | --------------------------------- |
| `toBe(x)`                       | Strict equality (`===`)           |
| `toEqual(x)`                    | Deep structural equality          |
| `toStrictEqual(x)`              | Deep equality + class/type checks |
| `toBeTruthy()` / `toBeFalsy()`  | Truthiness                        |
| `toBeNull()`, `toBeUndefined()` | Specific emptiness                |
| `toThrow(ErrorType?)`           | Function throws                   |
| `toMatchObject(partial)`        | Contains these fields             |
| `.resolves` / `.rejects`        | Async outcomes                    |

Negate any matcher by prefixing `.not`: `expect(x).not.toBeNull()`.

## Parametrized tests

```ts
it.each([
  ["", 0],
  ["1", 1],
  ["1,2", 3],
])("add(%s) returns %i", (input, expected) => {
  expect(add(input)).toBe(expected);
});
```

## Test doubles

```ts
import { vi } from "vitest";

const spy = vi.fn().mockReturnValue(42); // canned answer
spy("a");
expect(spy).toHaveBeenCalledWith("a");
expect(spy).toHaveBeenCalledTimes(1);

const failing = vi.fn().mockRejectedValue(new Error("down"));
```

Module replacement:

```ts
vi.mock("./clock", () => ({ now: () => new Date("2026-01-01T00:00:00Z") }));
```

Timers: `vi.useFakeTimers()` / `vi.setSystemTime(...)` - restore with
`vi.useRealTimers()` in `afterEach`.

## Async tests

```ts
it("loads the user", async () => {
  const user = await repository.findById("u1");
  expect(user?.name).toBe("Ada");
});

it("fails on missing user", async () => {
  await expect(repository.findById("missing")).rejects.toThrow(NotFound);
});
```

## Coverage

```bash
npx vitest run --coverage      # requires: npm i -D @vitest/coverage-v8
```

## Running

| Command                   | Effect                       |
| ------------------------- | ---------------------------- |
| `vitest`                  | Watch mode during TDD cycles |
| `vitest run`              | Single pass (CI)             |
| `vitest run cart.test.ts` | One file                     |
| `vitest run -t "totals"`  | Filter by test name          |

## References

- [Vitest documentation](https://vitest.dev/guide/)
- [Jest documentation](https://jestjs.io/docs/getting-started)
