# Kata: String Calculator

The classic TDD warm-up ([original by Roy Osherove](https://osherove.com/tdd-kata-1)):
build `add(numbers: string)` through strict red-green-refactor cycles.

## Requirements (reveal one at a time - do not read ahead!)

Open the next step only after the previous one is green and refactored.

<details>
<summary>Step 1</summary>

`add("")` returns `0`

</details>

<details>
<summary>Step 2</summary>

`add("7")` returns `7`

</details>

<details>
<summary>Step 3</summary>

`add("1,2")` returns `3`

</details>

<details>
<summary>Step 4</summary>

Any amount of numbers: `add("1,2,3,4,5")` returns `15`

</details>

<details>
<summary>Step 5</summary>

Newlines also separate: `add("1\n2,3")` returns `6`

</details>

<details>
<summary>Step 6</summary>

Custom delimiter: `add("//;\n1;2")` returns `3`

</details>

<details>
<summary>Step 7</summary>

Negatives throw with message `negatives not allowed: -2,-4`

</details>

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

A red (failing) run is the expected first result after you add a new test.
It looks roughly like this:

```text
F                                                    [100%]
FAILED test_string_calculator.py::test_single_number_returns_itself
AssertionError: assert 0 == 7
```

`solution/` contains a reference implementation with all seven tests - peek
only after finishing, or to compare style afterwards.
