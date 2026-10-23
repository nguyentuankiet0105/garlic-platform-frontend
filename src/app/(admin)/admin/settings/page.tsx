import type { Metadata } from "next";
import { FeaturePlaceholder } from "@/shared/components/feature-placeholder";

export const metadata: Metadata = { title: "Cài đặt" };

export default function Page() {
  return (
    <FeaturePlaceholder
      title="Cài đặt"
      description="Cấu hình hệ thống."
      service="Auth & Admin service"
      planned={["Thông tin công ty", "Ngưỡng lên cấp đại lý", "Mẫu email thông báo"]}
    />
  );
}
