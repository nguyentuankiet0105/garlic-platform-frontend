import { LogoutButton } from "@/features/auth";
import type { Session } from "@/features/auth";
import { Badge } from "@/shared/ui";

export function AdminTopbar({ session }: { session: Session }) {
  return (
    <>
      <Badge tone="brand">{session.role === "ADMIN" ? "Admin" : "Nhân viên"}</Badge>
      <span className="text-muted-foreground hidden text-sm sm:inline">{session.email}</span>
      <LogoutButton />
    </>
  );
}
