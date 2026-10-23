import { Menu } from "lucide-react";
import Link from "next/link";
import { getSession, homeFor } from "@/features/auth/server";
import { ROUTES } from "@/shared/config/routes";
import { ButtonLink, Container, Logo } from "@/shared/ui";
import { STOREFRONT_NAV } from "../config/nav";

export async function StorefrontHeader() {
  const session = await getSession();
  return (
    <header className="border-border/70 bg-background/85 sticky top-0 z-20 border-b backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {STOREFRONT_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {session ? (
            <ButtonLink href={homeFor(session.role)} size="sm">
              Vào khu làm việc
            </ButtonLink>
          ) : (
            <>
              <ButtonLink href={ROUTES.login} variant="ghost" size="sm" className="hidden sm:inline-flex">
                Đăng nhập
              </ButtonLink>
              <ButtonLink href={ROUTES.becomeAgent} size="sm">
                Đăng ký đại lý
              </ButtonLink>
            </>
          )}
          {/* Menu mobile không cần JS: <details> */}
          <details className="relative md:hidden">
            <summary className="hover:bg-muted grid size-9 cursor-pointer list-none place-items-center rounded-lg [&::-webkit-details-marker]:hidden">
              <Menu className="size-5" />
            </summary>
            <div className="border-border bg-card absolute right-0 mt-2 grid w-56 gap-1 rounded-xl border p-2 shadow-lg">
              {STOREFRONT_NAV.map((item) => (
                <Link key={item.href} href={item.href} className="hover:bg-muted rounded-lg px-3 py-2 text-sm">
                  {item.label}
                </Link>
              ))}
              {!session && (
                <Link href={ROUTES.login} className="hover:bg-muted rounded-lg px-3 py-2 text-sm">
                  Đăng nhập
                </Link>
              )}
            </div>
          </details>
        </div>
      </Container>
    </header>
  );
}
