import type { Metadata } from "next";
import { CreditCard, Package, ShoppingBag, TrendingUp } from "lucide-react";
import { ROUTES } from "@/shared/config/routes";
import { formatVnd } from "@/shared/lib/format";
import { Badge, ButtonLink, Card, CardContent, CardHeader, CardTitle, PageHeader, StatCard } from "@/shared/ui";

export const metadata: Metadata = { title: "Tổng quan đại lý" };

export default function PortalDashboardPage() {
  // TODO: lấy từ Agent service (createAgentsApi(serverHttp("agent")).me()) + Order service
  return (
    <>
      <PageHeader
        title="Tổng quan"
        description="Tình hình đơn hàng, công nợ và cấp đại lý của bạn."
        actions={<ButtonLink href={ROUTES.agent.catalog}>Đặt hàng mới</ButtonLink>}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Đơn tháng này" value="12" hint="+3 so với tháng trước" icon={ShoppingBag} />
        <StatCard label="Sản lượng tháng" value="640 kg" hint="Còn 360kg để lên Cấp 3" icon={TrendingUp} />
        <StatCard label="Công nợ hiện tại" value={formatVnd(18_500_000)} hint="Hạn mức 50.000.000đ" icon={CreditCard} />
        <StatCard label="Đang giao" value="2 đơn" hint="Dự kiến thứ Năm" icon={Package} />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Đơn gần đây</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">Danh sách đơn sẽ lấy từ Order service.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cấp đại lý</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Badge tone="garlic" className="w-fit">
              Cấp 2 — Đại lý
            </Badge>
            <div className="bg-muted h-2 overflow-hidden rounded-full">
              <div className="from-brand-500 to-brand-300 h-full w-[64%] rounded-full bg-linear-to-r" />
            </div>
            <p className="text-muted-foreground text-xs">64% tới Cấp 3</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
