import type { Metadata } from "next";
import { ClipboardList, PackageX, UserCheck, Wallet } from "lucide-react";
import { formatVnd } from "@/shared/lib/format";
import { Card, CardContent, CardHeader, CardTitle, PageHeader, StatCard } from "@/shared/ui";

export const metadata: Metadata = { title: "Tổng quan quản trị" };

export default function AdminDashboardPage() {
  // TODO: tổng hợp từ 3 service (server component gọi song song bằng Promise.all)
  return (
    <>
      <PageHeader title="Tổng quan" description="Hoạt động toàn hệ thống hôm nay." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Đại lý chờ duyệt" value="5" hint="Cần xử lý" icon={UserCheck} />
        <StatCard label="Đơn hôm nay" value="23" icon={ClipboardList} />
        <StatCard label="Doanh thu tháng" value={formatVnd(842_000_000)} icon={Wallet} />
        <StatCard label="Sắp hết hàng" value="3 SKU" icon={PackageX} />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hàng chờ duyệt đại lý</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">Lấy từ Auth service (status = PENDING).</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Đơn mới nhất</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm">Lấy từ Order service.</CardContent>
        </Card>
      </div>
    </>
  );
}
