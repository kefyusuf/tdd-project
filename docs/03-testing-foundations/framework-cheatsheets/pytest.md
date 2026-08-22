# pytest Cheat Sheet

## TL;DR

- pytest discovers files named `test_*.py` / `*_test.py` and functions named `test_*`.
- Plain `assert` statements with introspection output - no assertion API to memorize.
- Fixtures provide setup/teardown via dependency injection; `@pytest.mark.parametrize` covers data-driven cases.
- Mocking comes from the standard library's `unittest.mock` plus pytest's `monkeypatch`.

## Setup

```bash
pip install pytest
```

```toml
# pyproject.toml
[tool.pytest.ini_options]
testpaths = ["tests"]
```

```bash
pytest            # run all
pytest -k "cart"  # by keyword
pytest -x         # stop at first failure
pytest --lf       # rerun last failures
```

## Anatomy

```python
# tests/test_cart.py
import pytest

from cart import Cart


@pytest.fixture()
def cart():
    return Cart()


class TestCart:
    def test_starts_empty(self, cart):
        assert cart.item_count == 0

    def test_totals_the_price_of_added_items(self, cart):
        cart.add(name="Book", price=30)
        cart.add(name="Pen", price=2)

        assert cart.total == 32
```

Fixtures are injected by parameter name; a fixture can depend on other
fixtures. Teardown goes in a `finally`, or use `yield` fixtures:

```python
@pytest.fixture()
def temp_db(tmp_path):
    db = Database(path=tmp_path / "db.sqlite")
    yield db
    db.close()
```

`tmp_path` is one of pytest's built-in fixtures (per-test temporary directory).

## Parametrized tests

```python
@pytest.mark.parametrize(
    ("numbers", "expected"),
    [
        ("", 0),
        ("1", 1),
        ("1,2", 3),
    ],
)
def test_add(numbers, expected):
    assert add(numbers) == expected
```

## Expected exceptions

```python
import pytest


def test_rejects_negative_quantity():
    with pytest.raises(ValueError, match="quantity"):
        Cart().add(name="X", price=1, quantity=-1)
```

## Test doubles

Standard library mocks:

```python
from unittest.mock import Mock

gateway = Mock()
service = Checkout(gateway=gateway)

service.complete(total=100)

gateway.charge.assert_called_once_with(100)
gateway.charge.return_value = {"ok": True}   # canned answer
```

Monkeypatch for replacing attributes/modules:

```python
def test_uses_current_year(monkeypatch):
    monkeypatch.setattr(clock, "now", lambda: datetime(2026, 1, 1))
    assert current_year() == 2026
```

Patching is undone automatically at test end.

## Async tests

```bash
pip install pytest-asyncio
```

```python
@pytest.mark.asyncio
async def test_loads_user():
    user = await repository.find_by_id("u1")
    assert user.name == "Ada"
```

## Coverage

```bash
pip install pytest-cov
pytest --cov=myapp --cov-report=term-missing
```

## Useful plugins

| Plugin                       | Adds                                      |
| ---------------------------- | ----------------------------------------- |
| `pytest-asyncio`             | Native async test support                 |
| `pytest-cov`                 | Coverage reporting                        |
| `pytest-xdist`               | Parallel runs (`-n auto`)                 |
| `pytest-mock`                | `mocker` fixture wrapping `unittest.mock` |
| `freezegun` / `time-machine` | Freeze time deterministically             |

## References

- [pytest documentation](https://docs.pytest.org/en/stable/)
- [Fixtures reference](https://docs.pytest.org/en/stable/how-to/fixtures.html)
- [Parametrize reference](https://docs.pytest.org/en/stable/how-to/parametrize.html)
- [unittest.mock - Python stdlib](https://docs.python.org/3/library/unittest.mock.html)
