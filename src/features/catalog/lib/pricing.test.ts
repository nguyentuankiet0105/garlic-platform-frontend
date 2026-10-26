import { describe, expect, it } from "vitest";
import { clampQty } from "./pricing";

describe("clampQty", () => {
  const rule = { minPacks: 2, packStep: 2 };
  it("không xuống dưới mức tối thiểu", () => expect(clampQty(rule, 0)).toBe(2));
  it("làm tròn về bội số", () => {
    expect(clampQty(rule, 5)).toBe(6);
    expect(clampQty(rule, 4)).toBe(4);
  });
  it("step = 1", () => expect(clampQty({ minPacks: 1, packStep: 1 }, 3)).toBe(3));
});
