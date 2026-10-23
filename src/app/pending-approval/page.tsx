import type { Metadata } from "next";
import { LogoutButton } from "@/features/auth";
import { ButtonLink, Card, CardContent, Logo } from "@/shared/ui";

export const metadata: Metadata = { title: "Đang chờ duyệt" };

export default function PendingApprovalPage() {
  return (
    <main className="grid min-h-dvh place-items-center p-6">
      <Card className="w-full max-w-md text-center">
        <CardContent className="grid justify-items-center gap-4 p-8">
          <Logo />
          <span className="text-5xl">⏳</span>
          <h1 className="text-xl font-semibold">Hồ sơ đại lý đang chờ duyệt</h1>
          <p className="text-muted-foreground text-sm">
            Chúng tôi sẽ email cho bạn ngay khi hồ sơ được duyệt (thường trong 1–2 ngày làm việc).
          </p>
          <div className="flex gap-2">
            <ButtonLink href="/" variant="outline">
              Về trang chủ
            </ButtonLink>
            <LogoutButton />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
