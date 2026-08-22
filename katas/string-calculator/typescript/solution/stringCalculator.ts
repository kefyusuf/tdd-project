export function add(numbers: string): number {
  if (numbers === "") return 0;

  const { body, delimiter } = splitCustomDelimiter(numbers);
  const parts = body === "" ? [] : body.split(new RegExp(`[,\n${escapeRegExp(delimiter)}]`));
  const values = parts.map(Number);

  const negatives = values.filter((v) => v < 0);
  if (negatives.length > 0) {
    throw new Error(`negatives not allowed: ${negatives.join(",")}`);
  }

  return values.reduce((a, b) => a + b, 0);
}

function splitCustomDelimiter(input: string): { body: string; delimiter: string } {
  const match = input.match(/^\/\/(.)\n(.*)$/s);
  if (!match) return { body: input, delimiter: "" };
  return { body: match[2], delimiter: match[1] };
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
