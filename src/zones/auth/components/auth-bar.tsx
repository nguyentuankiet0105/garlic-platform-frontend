import type { ReactNode } from "react";
import { Container, Logo } from "@/shared/ui";

/** Thanh đầu tối giản cho màn xác thực: logo + 1 slot bên phải. Không có điều hướng storefront → ít xao nhãng. */
export function AuthBar({ children }: { children?: ReactNode }) {
  return (
    <header className="border-border bg-background border-b">
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <Logo />
        {children && <div className="text-muted-foreground flex items-center gap-3 text-sm">{children}</div>}
      </Container>
    </header>
  );
}

/** Màn một cột ở giữa (Quên / Đặt lại mật khẩu). */
export function AuthCenter({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <AuthBar />
      <main className="grid flex-1 place-items-start justify-items-center px-4 py-12 sm:py-16">
        <div className="border-border bg-card w-full max-w-[440px] rounded-3xl border p-6 sm:p-8">{children}</div>
      </main>
    </div>
  );
}
