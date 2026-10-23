import type { Metadata } from "next";
import { FeaturePlaceholder } from "@/shared/components/feature-placeholder";

export const metadata: Metadata = { title: "Duyệt đại lý" };

export default function Page() {
  return (
    <FeaturePlaceholder
      title="Duyệt đại lý"
      description="Hàng chờ đăng ký và quản lý cấp đại lý."
      service="Auth service (duyệt) + Agent service (cấp, hạn mức)"
      planned={[
        "Danh sách PENDING / ACTIVE / SUSPENDED",
        "Duyệt / từ chối kèm lý do",
        "Gán cấp & hạn mức công nợ",
        "Phát sự kiện agent.approved → email",
      ]}
    />
  );
}
