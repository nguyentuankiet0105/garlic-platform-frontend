import type { ReactNode } from "react";
import { Logo } from "@/shared/ui";
import { SITE } from "@/shared/config/site";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.1fr_1fr]">
      <aside className="bg-hero relative hidden flex-col justify-between p-12 text-white lg:flex">
        <Logo inverted />
        <div className="grid gap-4">
          <p className="font-display text-4xl leading-tight font-semibold">{SITE.tagline}</p>
          <p className="text-brand-100/80 max-w-md">
            Đăng nhập để xem bảng giá sỉ theo cấp, đặt hàng và theo dõi công nợ.
          </p>
        </div>
        <p className="text-brand-200/60 text-xs">© {SITE.name}</p>
      </aside>
      <main className="grid place-items-center p-6">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
