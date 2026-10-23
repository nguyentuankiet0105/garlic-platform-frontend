import { describe, expect, it } from "vitest";
import { decodeSession } from "./jwt";

const token = (payload: object) => `h.${Buffer.from(JSON.stringify(payload)).toString("base64url")}.s`;
const future = Math.floor(Date.now() / 1000) + 600;

describe("decodeSession", () => {
  it("giải mã payload hợp lệ và mặc định status ACTIVE", () => {
    const s = decodeSession(token({ sub: "u1", email: "a@b.vn", role: "AGENT", exp: future }));
    expect(s).toMatchObject({ userId: "u1", role: "AGENT", status: "ACTIVE" });
  });
  it("từ chối token hết hạn, role lạ hoặc rác", () => {
    expect(decodeSession(token({ sub: "u1", role: "ADMIN", exp: 1 }))).toBeNull();
    expect(decodeSession(token({ sub: "u1", role: "USER", exp: future }))).toBeNull();
    expect(decodeSession("garbage")).toBeNull();
    expect(decodeSession(undefined)).toBeNull();
  });
});
