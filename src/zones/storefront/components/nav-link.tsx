"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

/** Link điều hướng đánh dấu trang hiện tại (aria-current + gạch chân màu thương hiệu). */
export function NavLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative px-1 py-2 text-[15px] font-medium transition-colors",
        active
          ? "text-brand-700 after:bg-brand-700 font-semibold after:absolute after:inset-x-0 after:-bottom-[17px] after:h-0.5 dark:text-brand-200 dark:after:bg-brand-200"
          : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {children}
    </Link>
  );
}
