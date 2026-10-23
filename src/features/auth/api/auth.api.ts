import type { HttpClient } from "@/shared/lib/api/http";
import type { LoginInput } from "../schemas/login.schema";
import type { Session } from "../types";

/** Browser → BFF (/api/auth/*) — các route này tự set/xoá cookie httpOnly. */
export const authApi = {
  login: async (input: LoginInput): Promise<{ session: Session; next: string }> => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.message ?? "Đăng nhập thất bại");
    return data;
  },
  logout: async () => {
    await fetch("/api/auth/logout", { method: "POST" });
  },
};

/** Gọi trực tiếp Auth service (server-side): dùng cho các endpoint cần Bearer. */
export const createAuthServiceApi = (http: HttpClient) => ({
  me: () => http.get<{ id: string; email: string; role: string }>("/auth/me"),
});
