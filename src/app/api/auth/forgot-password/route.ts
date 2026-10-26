import { NextResponse } from "next/server";
import { forgotSchema } from "@/features/auth/schemas/forgot.schema";
import { env } from "@/shared/config/env";

/** Luôn trả 200 dù email có tồn tại hay không (Auth service chống dò email; BFF giữ nguyên hành vi). */
export async function POST(req: Request) {
  const parsed = forgotSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Email không hợp lệ" }, { status: 400 });

  if (!env.USE_MOCKS) {
    try {
      const res = await fetch(`${env.services.auth}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: parsed.data.email }),
      });
      if (res.status === 429) return NextResponse.json({ message: "Bạn thử quá nhiều lần. Vui lòng đợi ít phút." }, { status: 429 });
    } catch {
      return NextResponse.json({ message: "Không kết nối được máy chủ xác thực" }, { status: 502 });
    }
  }
  return NextResponse.json({ ok: true });
}
