import "server-only";
import { MOCK_ACCOUNTS } from "../lib/mock-accounts";
import type { AccountStatus, Role, SessionTier } from "../types";

interface MockClaims {
  email: string;
  role: Role;
  status: AccountStatus;
  tier?: SessionTier;
}

/** Tạo "JWT" giả (chữ ký rác) chỉ dùng cho mock. */
export function signMockToken(claims: MockClaims, ttlSeconds: number): string {
  const enc = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  return `${enc({ alg: "none" })}.${enc({ sub: `mock-${claims.role.toLowerCase()}`, ...claims, exp })}.mock`;
}

export function makeMockToken(email: string, ttlSeconds: number): string | null {
  const acc = MOCK_ACCOUNTS[email];
  if (!acc) return null;
  return signMockToken({ email, role: acc.role, status: acc.status, tier: acc.tier }, ttlSeconds);
}
