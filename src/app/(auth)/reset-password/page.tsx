import type { Metadata } from "next";
import { ResetForm } from "@/features/auth";
import { AuthCenter } from "@/zones/auth/components/auth-bar";

export const metadata: Metadata = { title: "Đặt mật khẩu mới" };

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <AuthCenter>
      <ResetForm token={token} />
    </AuthCenter>
  );
}
