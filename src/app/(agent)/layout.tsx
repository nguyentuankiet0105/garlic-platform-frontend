import type { ReactNode } from "react";
import { requireRole } from "@/features/auth/server";
import { AppShell } from "@/shared/components/app-shell";
import { ROUTES } from "@/shared/config/routes";
import { PortalTopbar } from "@/zones/agent/components/portal-topbar";
import { AGENT_NAV } from "@/zones/agent/config/nav";

export default async function AgentLayout({ children }: { children: ReactNode }) {
  const session = await requireRole(["AGENT"], ROUTES.agent.root);
  return (
    <AppShell zoneLabel="Cổng đại lý" nav={AGENT_NAV} topbarRight={<PortalTopbar session={session} />}>
      {children}
    </AppShell>
  );
}
