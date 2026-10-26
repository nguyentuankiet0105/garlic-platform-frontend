import { NextResponse } from "next/server";
import { z } from "zod";
import { passwordRule } from "@/features/auth/schemas/password";
import { env } from "@/shared/config/env";

const bodySchema = z.object({ token: z.string().min(1), password: passwordRule });

export async function POST(req: Request) {
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Dữ liệu không hợp lệ" }, { status: 400 });
  const { token, password } = parsed.data;

  if (env.USE_MOCKS) {
    // Token "expired" mô phỏng liên kết hết hạn / đã dùng.
    if (token === "expired") return NextResponse.json({ message: "Liên kết đã hết hạn" }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  try {
    // TODO(backend): xác nhận tên field của ResetPasswordDto (đang giả định `token` + `newPassword`).
    const res = await fetch(`${env.services.auth}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const message = Array.isArray(data?.message) ? data.message.join(", ") : (data?.message ?? "Liên kết không hợp lệ");
      return NextResponse.json({ message }, { status: res.status });
    }
  } catch {
    return NextResponse.json({ message: "Không kết nối được máy chủ xác thực" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
