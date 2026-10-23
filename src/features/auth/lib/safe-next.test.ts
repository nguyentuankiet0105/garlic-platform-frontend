import { describe, expect, it } from "vitest";
import { safeNext } from "./safe-next";

describe("safeNext", () => {
  it("chỉ nhận đường dẫn nội bộ", () => {
    expect(safeNext("/portal/orders")).toBe("/portal/orders");
    expect(safeNext("//evil.com")).toBeUndefined();
    expect(safeNext("https://evil.com")).toBeUndefined();
    expect(safeNext(undefined)).toBeUndefined();
  });
});
