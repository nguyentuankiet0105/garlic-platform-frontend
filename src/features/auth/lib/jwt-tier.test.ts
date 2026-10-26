import { describe, expect, it } from "vitest";
import { decodeSession } from "./jwt";

const token = (payload: object) => {
  const enc = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  return `${enc({ alg: "none" })}.${enc(payload)}.x`;
};
const exp = Math.floor(Date.now() / 1000) + 600;

describe("decodeSession tier claim", () => {
  it("đọc tier hợp lệ", () => {
    expect(decodeSession(token({ sub: "1", role: "AGENT", exp, tier: "T3" }))?.tier).toBe("T3");
  });
  it("bỏ qua tier lạ", () => {
    expect(decodeSession(token({ sub: "1", role: "AGENT", exp, tier: "T9" }))?.tier).toBeUndefined();
  });
});
