import type { Metadata } from "next";
import { FeaturePlaceholder } from "@/shared/components/feature-placeholder";

export const metadata: Metadata = { title: "Công nợ & thanh toán" };

export default function Page() {
  return (
    <FeaturePlaceholder
      title="Công nợ & thanh toán"
      description="Dư nợ, hạn mức và thanh toán."
      service="Agent service (Stripe test mode)"
      planned={[
        "Dư nợ & hạn thanh toán",
        "Thanh toán qua Stripe (test mode)",
        "Lịch sử giao dịch",
        "Nhắc công nợ qua email",
      ]}
    />
  );
}
