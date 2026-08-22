from string_calculator import add


def test_empty_string_returns_zero():
    assert add("") == 0


def test_single_number_returns_itself():
    assert add("7") == 7


def test_sums_two_comma_separated_numbers():
    assert add("1,2") == 3


def test_sums_any_amount_of_comma_separated_numbers():
    assert add("1,2,3,4,5") == 15


def test_treats_newlines_as_separators():
    assert add("1\n2,3") == 6


def test_supports_custom_delimiters():
    assert add("//;\n1;2") == 3


def test_throws_listing_negative_numbers():
    import pytest

    with pytest.raises(ValueError) as excinfo:
        add("1,-2,3,-4")
    assert "negatives not allowed: -2,-4" in str(excinfo.value)
