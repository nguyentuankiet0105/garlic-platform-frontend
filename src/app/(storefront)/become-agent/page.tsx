import type { Metadata } from "next";
import { Container } from "@/shared/ui";
import { FeaturePlaceholder } from "@/shared/components/feature-placeholder";

export const metadata: Metadata = { title: "Đăng ký đại lý" };

export default function BecomeAgentPage() {
  return (
    <Container className="py-12">
      <FeaturePlaceholder
        title="Đăng ký làm đại lý"
        description="Form đăng ký → tạo tài khoản trạng thái PENDING → admin duyệt → email thông báo."
        service="Auth & Admin service (tài khoản) + Agent service (hồ sơ đại lý)"
        planned={[
          "Form nhiều bước (react-hook-form + zod)",
          "Thông tin doanh nghiệp, MST, địa chỉ kho",
          "Upload giấy phép (S3 presigned URL)",
          "Trang xác nhận + sự kiện agent.registered",
        ]}
      />
    </Container>
  );
}
