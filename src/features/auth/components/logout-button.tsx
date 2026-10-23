"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/shared/ui";
import { authApi } from "../api/auth.api";

export function LogoutButton() {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() =>
        start(async () => {
          await authApi.logout();
          router.replace("/login");
          router.refresh();
        })
      }
    >
      <LogOut className="size-4" />
      <span className="hidden sm:inline">Đăng xuất</span>
    </Button>
  );
}
