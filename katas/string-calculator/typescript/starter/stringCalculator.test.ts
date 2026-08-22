import { describe, expect, it } from "vitest";
import { add } from "./stringCalculator";

describe("add", () => {
  it("returns 0 for an empty string", () => {
    expect(add("")).toBe(0);
  });

  // Add the next test here. One at a time.
});
