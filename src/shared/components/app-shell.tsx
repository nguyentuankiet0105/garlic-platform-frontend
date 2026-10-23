import type { ReactNode } from "react";
import { Logo } from "@/shared/ui";
import type { NavItem } from "./nav-icons";
import { SidebarNav } from "./sidebar-nav";

/**
 * Khung dùng chung cho 2 zone "làm việc" (Agent portal, Admin console):
 * sidebar teal đậm (desktop) + thanh nav ngang (mobile) + topbar.
 * Zone chỉ khác nhau ở: nav, nhãn, và slot bên phải topbar.
 */
export function AppShell({
  zoneLabel,
  nav,
  topbarRight,
  children,
}: {
  zoneLabel: string;
  nav: NavItem[];
  topbarRight: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="bg-sidebar sticky top-0 hidden h-dvh flex-col gap-6 p-4 lg:flex">
        <div className="px-1 pt-1">
          <Logo inverted />
          <p className="text-brand-200 mt-3 inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium">
            {zoneLabel}
          </p>
        </div>
        <SidebarNav items={nav} />
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="border-border bg-background/85 sticky top-0 z-10 border-b backdrop-blur">
          <div className="flex h-14 items-center justify-between gap-3 px-4 sm:px-6">
            <div className="lg:hidden">
              <Logo />
            </div>
            <div className="ml-auto flex items-center gap-2">{topbarRight}</div>
          </div>
          <div className="border-border border-t px-3 py-2 lg:hidden">
            <SidebarNav items={nav} orientation="horizontal" />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
