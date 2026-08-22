import re


def add(numbers: str) -> int:
    if numbers == "":
        return 0

    body, custom = _split_custom_delimiter(numbers)
    separators = f"[{re.escape(custom)}]" if custom else r"[,\n]"
    values = [int(part) for part in re.split(separators, body)]

    negatives = [v for v in values if v < 0]
    if negatives:
        raise ValueError("negatives not allowed: " + ",".join(str(v) for v in negatives))

    return sum(values)


def _split_custom_delimiter(input_str: str) -> tuple[str, str]:
    match = re.match(r"^//(.)\n(.*)$", input_str, flags=re.DOTALL)
    if not match:
        return input_str, ""
    return match.group(2), match.group(1)
