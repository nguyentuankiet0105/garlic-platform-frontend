import type { Metadata } from "next";
import { FeaturePlaceholder } from "@/shared/components/feature-placeholder";

export const metadata: Metadata = { title: "Tài khoản" };

export default function Page() {
  return (
    <FeaturePlaceholder
      title="Tài khoản"
      description="Thông tin doanh nghiệp và bảo mật."
      service="Auth service + Agent service"
      planned={["Hồ sơ doanh nghiệp", "Đổi mật khẩu", "Địa chỉ kho nhận hàng"]}
    />
  );
}
