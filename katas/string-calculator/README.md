# Kata: String Calculator

The classic TDD warm-up ([original by Roy Osherove](https://osherove.com/tdd-kata-1)):
build `add(numbers: string)` through strict red-green-refactor cycles.

## Requirements (reveal one at a time - do not read ahead!)

1. `add("")` returns `0`
2. `add("7")` returns `7`
3. `add("1,2")` returns `3`
4. Any amount of numbers: `add("1,2,3,4,5")` returns `15`
5. Newlines also separate: `add("1\n2,3")` returns `6`
6. Custom delimiter: `add("//;\n1;2")` returns `3`
7. Negatives throw with message `negatives not allowed: -2,-4`

## Rules

- Write ONE test. Watch it fail. Make it pass. Refactor. Only then, next test.
- Never write production code without a failing test demanding it.
- Full walkthrough if stuck: [Red, Green, Refactor](../../docs/01-tdd/red-green-refactor.md)

## Run it

**TypeScript** (Node 18+):

```bash
cd typescript/starter
npm install
npm run test:watch   # keep this running during the whole kata
```

**Python** (3.10+, `pip install pytest`):

```bash
cd python/starter
python -m pytest -q   # rerun after every change
```

`solution/` contains a reference implementation with all seven tests - peek
only after finishing, or to compare style afterwards.
