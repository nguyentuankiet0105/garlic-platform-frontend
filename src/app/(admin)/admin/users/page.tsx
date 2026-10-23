import type { Metadata } from "next";
import { FeaturePlaceholder } from "@/shared/components/feature-placeholder";

export const metadata: Metadata = { title: "Người dùng & phân quyền" };

export default function Page() {
  return (
    <FeaturePlaceholder
      title="Người dùng & phân quyền"
      description="Quản lý tài khoản nội bộ và vai trò."
      service="Auth & Admin service"
      planned={["CRUD user (ADMIN/STAFF/AGENT)", "Khoá / mở tài khoản", "Gán vai trò"]}
    />
  );
}
