import { describe, expect, it } from "vitest";
import { classifyLoginError } from "./login-error";

describe("classifyLoginError", () => {
  it.each([
    [401, "invalid"],
    [400, "invalid"],
    [403, "inactive"],
    [429, "throttled"],
    [500, "unknown"],
    [undefined, "unknown"],
  ] as const)("status %s → %s", (status, kind) => {
    expect(classifyLoginError(status)).toBe(kind);
  });
});
