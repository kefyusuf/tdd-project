import { describe, expect, it } from "vitest";
import { add } from "./stringCalculator";

describe("add", () => {
  it("returns 0 for an empty string", () => {
    expect(add("")).toBe(0);
  });

  it("returns the number itself for a single number", () => {
    expect(add("7")).toBe(7);
  });

  it("sums two comma-separated numbers", () => {
    expect(add("1,2")).toBe(3);
  });

  it("sums any amount of comma-separated numbers", () => {
    expect(add("1,2,3,4,5")).toBe(15);
  });

  it("treats newlines as separators", () => {
    expect(add("1\n2,3")).toBe(6);
  });

  it("supports custom delimiters declared with //;\n", () => {
    expect(add("//;\n1;2")).toBe(3);
  });

  it("throws listing negative numbers", () => {
    expect(() => add("1,-2,3,-4")).toThrow("negatives not allowed: -2,-4");
  });
});
