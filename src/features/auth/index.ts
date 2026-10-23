/**
 * PUBLIC API của feature auth. Code ngoài feature chỉ import từ "@/features/auth".
 * Lưu ý: server-only helpers (getSession, requireRole) export ở "@/features/auth/server"
 * để không kéo `next/headers` vào client bundle.
 */
export { LogoutButton } from "./components/logout-button";
export { LoginForm } from "./components/login-form";
export { safeNext } from "./lib/safe-next";
export { decodeSession } from "./lib/jwt";
export { MOCK_ACCOUNTS } from "./lib/mock-accounts";
export { authApi } from "./api/auth.api";
export type { AccountStatus, Role, Session } from "./types";
