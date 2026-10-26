import { Menu, Search, ShoppingCart, Truck } from "lucide-react";
import Link from "next/link";
import { TierBadge } from "@/features/agents";
import { getSession, homeFor } from "@/features/auth/server";
import { ThemeToggle } from "@/shared/components/theme-toggle";
import { ROUTES } from "@/shared/config/routes";
import { SITE } from "@/shared/config/site";
import { ButtonLink, Container, Logo } from "@/shared/ui";
import { STOREFRONT_NAV } from "../config/nav";
import { getViewer } from "../lib/viewer";
import { NavLink } from "./nav-link";

export async function StorefrontHeader() {
  const [session, viewer] = await Promise.all([getSession(), getViewer()]);
  return (
    <header className="sticky top-0 z-20">
      <div className="bg-brand-800 text-brand-50">
        <Container className="flex h-9 items-center justify-between gap-4 text-[13px]">
          <span className="inline-flex items-center gap-1.5">
            <Truck className="size-3.5" aria-hidden />
            Chỉ bán sỉ cho đại lý đã đăng ký
          </span>
          <span className="hidden sm:inline">
            Hotline {SITE.hotline} · {SITE.hotlineHours}
          </span>
        </Container>
      </div>
      <div className="border-border bg-background/95 border-b backdrop-blur">
        <Container className="flex h-[72px] items-center gap-4 lg:gap-8">
          <Logo />
          <nav aria-label="Chính" className="hidden items-center gap-6 md:flex">
            {STOREFRONT_NAV.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <form action={ROUTES.storefront.products} role="search" className="relative ml-auto hidden max-w-xs flex-1 lg:block">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" aria-hidden />
            <input
              name="q"
              type="search"
              placeholder="Tìm sản phẩm…"
              aria-label="Tìm sản phẩm"
              className="border-border-strong bg-card placeholder:text-muted-foreground focus:border-primary focus:ring-ring-soft h-10 w-full rounded-[10px] border pr-3 pl-9 text-sm outline-none focus:ring-[3px]"
            />
          </form>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <ThemeToggle />
            {viewer.kind === "agent" && viewer.tier && <TierBadge tier={viewer.tier} className="hidden sm:inline-flex" />}
            {viewer.kind === "pending" && (
              <Link
                href={ROUTES.pendingApproval}
                className="hidden rounded-full bg-warning-50 px-3 py-1.5 text-xs font-semibold text-[#7a4f00] no-underline sm:inline-block"
              >
                Chờ duyệt
              </Link>
            )}
            {viewer.kind === "agent" && (
              <ButtonLink href={ROUTES.agent.cart} variant="outline" size="icon" aria-label="Giỏ hàng">
                <ShoppingCart className="size-5" aria-hidden />
              </ButtonLink>
            )}
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
              <summary
                aria-label="Mở menu"
                className="hover:bg-muted grid size-11 cursor-pointer list-none place-items-center rounded-lg [&::-webkit-details-marker]:hidden"
              >
                <Menu className="size-5" aria-hidden />
              </summary>
              <div className="border-border bg-card absolute right-0 mt-2 grid w-60 gap-1 rounded-xl border p-2 shadow-lg">
                {STOREFRONT_NAV.map((item) => (
                  <Link key={item.href} href={item.href} className="hover:bg-muted rounded-lg px-3 py-3 text-sm">
                    {item.label}
                  </Link>
                ))}
                {!session && (
                  <Link href={ROUTES.login} className="hover:bg-muted rounded-lg px-3 py-3 text-sm">
                    Đăng nhập
                  </Link>
                )}
              </div>
            </details>
          </div>
        </Container>
      </div>
    </header>
  );
}
