import type { Metadata } from "next";
import { LoginForm, MOCK_ACCOUNTS, safeNext } from "@/features/auth";
import { env } from "@/shared/config/env";
import { ROUTES } from "@/shared/config/routes";
import Link from "next/link";

export const metadata: Metadata = { title: "Đăng nhập" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Đăng nhập</h1>
        <p className="text-muted-foreground mt-1 text-sm">Dành cho đại lý và nhân viên Garlic Hub.</p>
      </div>
      <LoginForm next={safeNext(next)} />
      <p className="text-muted-foreground text-center text-sm">
        Chưa có tài khoản?{" "}
        <Link href={ROUTES.becomeAgent} className="text-primary font-medium hover:underline">
          Đăng ký đại lý
        </Link>
      </p>
      {env.USE_MOCKS && (
        <div className="border-border bg-muted/50 text-muted-foreground rounded-xl border border-dashed p-4 text-xs">
          <p className="text-foreground mb-2 font-medium">Chế độ demo (mock) — mật khẩu bất kỳ ≥ 6 ký tự:</p>
          <ul className="grid gap-1">
            {Object.entries(MOCK_ACCOUNTS).map(([email, a]) => (
              <li key={email}>
                <code className="text-foreground">{email}</code> — {a.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
