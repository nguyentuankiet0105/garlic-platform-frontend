import { LogoutButton } from "@/features/auth";
import type { Session } from "@/features/auth";
import { Badge } from "@/shared/ui";

export function PortalTopbar({ session }: { session: Session }) {
  return (
    <>
      <Badge tone="garlic" className="hidden sm:inline-flex">
        Đại lý
      </Badge>
      <span className="text-muted-foreground hidden text-sm sm:inline">{session.email}</span>
      <LogoutButton />
    </>
  );
}
