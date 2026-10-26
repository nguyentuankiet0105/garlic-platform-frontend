import type { Metadata } from "next";
import { ForgotForm } from "@/features/auth";
import { AuthCenter } from "@/zones/auth/components/auth-bar";

export const metadata: Metadata = { title: "Quên mật khẩu" };

export default function ForgotPasswordPage() {
  return (
    <AuthCenter>
      <ForgotForm />
    </AuthCenter>
  );
}
