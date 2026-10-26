import type { ReactNode } from "react";

/** Mỗi màn xác thực tự dựng khung (Login chia đôi, Đăng ký có thanh đầu, Quên/Đặt lại căn giữa) — layout chỉ chuyển tiếp. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
