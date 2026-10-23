import "server-only";
import { MOCK_ACCOUNTS } from "../lib/mock-accounts";

/** Tạo "JWT" giả (chữ ký rác) chỉ dùng cho mock. */
export function makeMockToken(email: string, ttlSeconds: number): string | null {
  const acc = MOCK_ACCOUNTS[email];
  if (!acc) return null;
  const enc = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  return `${enc({ alg: "none" })}.${enc({ sub: `mock-${acc.role.toLowerCase()}`, email, role: acc.role, status: acc.status, exp })}.mock`;
}
