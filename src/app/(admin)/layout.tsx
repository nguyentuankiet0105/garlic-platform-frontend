import type { ReactNode } from "react";
import { requireRole } from "@/features/auth/server";
import { AppShell } from "@/shared/components/app-shell";
import { ROUTES } from "@/shared/config/routes";
import { AdminTopbar } from "@/zones/admin/components/admin-topbar";
import { ADMIN_NAV } from "@/zones/admin/config/nav";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await requireRole(["ADMIN", "STAFF"], ROUTES.admin.root);
  return (
    <AppShell zoneLabel="Quản trị" nav={ADMIN_NAV} topbarRight={<AdminTopbar session={session} />}>
      {children}
    </AppShell>
  );
}
