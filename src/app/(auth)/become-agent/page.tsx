import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/features/auth";
import { ROUTES } from "@/shared/config/routes";
import { SITE } from "@/shared/config/site";
import { Overline } from "@/shared/ui";
import { AuthBar } from "@/zones/auth/components/auth-bar";

export const metadata: Metadata = { title: "Đăng ký làm đại lý" };

const STEPS = [
  ["Gửi hồ sơ", "Thông tin cửa hàng và người liên hệ"],
  ["Chờ duyệt", `Đội kinh doanh xác minh trong ${SITE.policy.approvalTime}`],
  ["Nhận cấp đại lý", "Giá sỉ và hạn mức công nợ theo cấp"],
] as const;

export default function BecomeAgentPage() {
  return (
    <div className="min-h-dvh">
      <AuthBar>
        <span>
          Đã có tài khoản?{" "}
          <Link href={ROUTES.login} className="font-semibold">
            Đăng nhập
          </Link>
        </span>
      </AuthBar>
      <main className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-10 sm:px-8 lg:grid-cols-[360px_1fr] lg:items-start lg:py-14">
        <aside className="grid content-start gap-8 lg:sticky lg:top-8">
          <div className="grid gap-3">
            <Overline className="text-[13px]">Chương trình đại lý</Overline>
            <h1 className="font-display text-[40px] leading-[48px] font-semibold">Đăng ký làm đại lý</h1>
            <p className="text-muted-foreground leading-6">
              Miễn phí, mất khoảng 3 phút. Sau khi được duyệt, bạn sẽ nhận email và vào ngay cổng đại lý.
            </p>
          </div>
          <ol className="grid list-none gap-5 p-0">
            {STEPS.map(([title, text], i) => (
              <li key={title} className="flex gap-3.5">
                <span className="bg-primary text-primary-foreground grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold">
                  {i + 1}
                </span>
                <span className="grid gap-0.5">
                  <span className="font-semibold">{title}</span>
                  <span className="text-muted-foreground text-sm leading-5">{text}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="bg-muted text-muted-foreground rounded-xl p-4 text-sm">
            Cần hỗ trợ? Gọi {SITE.hotline} hoặc email {SITE.supportEmail}.
          </p>
        </aside>
        <RegisterForm />
      </main>
    </div>
  );
}
