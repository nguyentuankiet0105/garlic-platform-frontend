import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm, MOCK_ACCOUNTS, safeNext } from "@/features/auth";
import { env } from "@/shared/config/env";
import { ROUTES } from "@/shared/config/routes";
import { Logo } from "@/shared/ui";

export const metadata: Metadata = { title: "Đăng nhập" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      <aside className="bg-brand-800 text-brand-50 relative hidden flex-col justify-between p-12 lg:flex">
        <Logo inverted />
        <p className="font-display max-w-md text-4xl leading-[1.25] font-semibold">
          Đặt lại đơn quen, xem công nợ, theo dõi giao hàng — ở một nơi.
        </p>
        <p className="text-brand-200 text-sm">Ảnh kho tỏi Lý Sơn sẽ đặt ở đây khi có tư liệu.</p>
      </aside>

      <main className="grid place-items-center px-4 py-10 sm:px-8">
        <div className="grid w-full max-w-[420px] gap-6">
          <div className="lg:hidden">
            <Logo />
          </div>
          <div className="grid gap-1.5">
            <h1 id="l-title" className="font-display text-[32px] leading-10 font-semibold">
              Đăng nhập
            </h1>
            <p className="text-muted-foreground text-sm">Dành cho đại lý và nhân viên Tỏi Mộc.</p>
          </div>
          <LoginForm next={safeNext(next)} />
          <p className="text-muted-foreground flex flex-wrap justify-center gap-x-2 text-sm">
            Chưa là đại lý?
            <Link href={ROUTES.becomeAgent} className="font-semibold">
              Đăng ký làm đại lý →
            </Link>
          </p>
          {env.USE_MOCKS && (
            <div className="border-border-strong bg-muted/60 text-muted-foreground rounded-xl border border-dashed p-4 text-xs">
              <p className="text-foreground mb-2 font-semibold">Chế độ demo — mật khẩu bất kỳ ≥ 6 ký tự:</p>
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
      </main>
    </div>
  );
}
