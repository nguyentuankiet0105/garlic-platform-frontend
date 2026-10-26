import type { HttpClient } from "@/shared/lib/api/http";
import { AuthRequestError } from "../lib/login-error";
import type { ForgotInput, ResetInput } from "../schemas/forgot.schema";
import type { LoginInput } from "../schemas/login.schema";
import type { RegisterInput } from "../schemas/register.schema";
import type { Session } from "../types";

async function post<T>(url: string, body: unknown, fallback: string): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new AuthRequestError(res.status, data?.message ?? fallback);
  return data as T;
}

/** Browser → BFF (/api/auth/*) — các route này tự set/xoá cookie httpOnly. */
export const authApi = {
  login: (input: LoginInput) =>
    post<{ session: Session; next: string }>("/api/auth/login", input, "Đăng nhập thất bại"),
  register: (input: RegisterInput) =>
    post<{ session: Session; next: string }>("/api/auth/register", input, "Đăng ký thất bại"),
  forgotPassword: (input: ForgotInput) => post<{ ok: true }>("/api/auth/forgot-password", input, "Không gửi được liên kết"),
  resetPassword: (input: { token: string } & Pick<ResetInput, "password">) =>
    post<{ ok: true }>("/api/auth/reset-password", input, "Không đặt lại được mật khẩu"),
  logout: async () => {
    await fetch("/api/auth/logout", { method: "POST" });
  },
};

/** Gọi trực tiếp Auth service (server-side): dùng cho các endpoint cần Bearer. */
export const createAuthServiceApi = (http: HttpClient) => ({
  me: () => http.get<{ id: string; email: string; role: string }>("/auth/me"),
});
