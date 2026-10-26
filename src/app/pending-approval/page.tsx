import { CircleCheck, Clock, FileWarning } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { TierBadge } from "@/features/agents";
import { LogoutButton } from "@/features/auth";
import { getSession, homeFor } from "@/features/auth/server";
import { ROUTES } from "@/shared/config/routes";
import { SITE } from "@/shared/config/site";
import { ButtonLink } from "@/shared/ui";
import { cn } from "@/shared/lib/cn";
import { AuthBar } from "@/zones/auth/components/auth-bar";

export const metadata: Metadata = { title: "Trạng thái hồ sơ đại lý" };

const STEPS = [
  { title: "Đã gửi hồ sơ", note: "Chúng tôi đã nhận thông tin của bạn", state: "done" },
  { title: "Đang xác minh", note: "Có thể chúng tôi gọi điện để xác nhận thông tin", state: "current" },
  { title: "Xếp cấp & mở khoá cổng đại lý", note: "Bạn sẽ thấy giá sỉ và hạn mức công nợ", state: "todo" },
] as const;

export default async function PendingApprovalPage() {
  const session = await getSession();
  if (!session) redirect(`${ROUTES.login}?next=${encodeURIComponent(ROUTES.pendingApproval)}`);
  if (session.role !== "AGENT") redirect(homeFor(session.role));

  const status = session.status === "ACTIVE" ? "approved" : session.status === "REJECTED" ? "rejected" : "pending";
  const initials = session.email.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-dvh">
      <AuthBar>
        <span aria-hidden className="bg-primary-soft text-primary-soft-foreground grid size-9 place-items-center rounded-full text-[13px] font-bold">
          {initials}
        </span>
        <span className="hidden sm:inline">{session.email}</span>
        <LogoutButton />
      </AuthBar>

      <main className="mx-auto grid w-full max-w-[640px] gap-6 px-4 py-12 sm:py-16">
        {status === "pending" && (
          <section aria-labelledby="p-h" className="border-border bg-card grid gap-6 rounded-3xl border p-6 sm:p-8">
            <div className="grid justify-items-start gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-warning-50 text-[#7a4f00]">
                <Clock className="size-6" aria-hidden />
              </span>
              <span className="rounded-full bg-warning-50 px-3 py-1 text-xs font-semibold text-[#7a4f00]">Chờ duyệt</span>
              <h1 id="p-h" className="font-display text-[32px] leading-10 font-semibold">
                Hồ sơ của bạn đang được xem xét
              </h1>
              <p className="text-muted-foreground leading-6">
                Đội kinh doanh sẽ xác minh trong {SITE.policy.approvalTime}. Khi được duyệt, chúng tôi gửi email đến{" "}
                <strong className="text-foreground">{session.email}</strong> và cổng đại lý sẽ tự mở khoá.
              </p>
            </div>
            <ol aria-label="Tiến trình duyệt" className="grid list-none gap-0 p-0">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        "grid size-7 place-items-center rounded-full border-2",
                        s.state === "done" && "bg-primary border-primary text-primary-foreground",
                        s.state === "current" && "border-primary bg-card",
                        s.state === "todo" && "border-border-strong bg-card",
                      )}
                    >
                      {s.state === "done" && <CircleCheck className="size-4" aria-hidden />}
                      {s.state === "current" && <span className="bg-primary size-2.5 rounded-full" />}
                    </span>
                    {i < STEPS.length - 1 && <span className="bg-border-strong my-1 w-0.5 flex-1" />}
                  </div>
                  <div className="grid gap-0.5 pb-5">
                    <span className={cn("font-semibold", s.state === "todo" && "text-muted-foreground")}>
                      {s.title}
                      {s.state === "current" && <span className="text-muted-foreground font-normal"> · bước hiện tại</span>}
                    </span>
                    <span className="text-muted-foreground text-sm">{s.note}</span>
                  </div>
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={ROUTES.storefront.products}>Xem sản phẩm trong lúc chờ</ButtonLink>
            </div>
          </section>
        )}

        {status === "approved" && (
          <section aria-labelledby="a-h" className="border-border bg-card grid justify-items-start gap-4 rounded-3xl border p-6 sm:p-8">
            <span className="bg-primary-soft text-primary-soft-foreground grid size-12 place-items-center rounded-full">
              <CircleCheck className="size-6" aria-hidden />
            </span>
            <h1 id="a-h" className="font-display text-[32px] leading-10 font-semibold">
              Chào mừng bạn đến với {SITE.name}!
            </h1>
            <p className="text-muted-foreground leading-6">
              Tài khoản đã được duyệt. Cổng đại lý đã mở khoá với quyền lợi theo cấp của bạn.
            </p>
            {session.tier && (
              <div className="bg-muted flex items-center gap-3 rounded-xl px-4 py-3 text-sm">
                <span className="text-muted-foreground">Cấp đại lý</span>
                <TierBadge tier={session.tier} />
              </div>
            )}
            <ButtonLink href={ROUTES.agent.root} size="lg">
              Vào cổng đại lý
            </ButtonLink>
          </section>
        )}

        {status === "rejected" && (
          <section aria-labelledby="x-h" className="border-border bg-card grid justify-items-start gap-4 rounded-3xl border p-6 sm:p-8">
            <span className="grid size-12 place-items-center rounded-full bg-danger-50 text-danger-600">
              <FileWarning className="size-6" aria-hidden />
            </span>
            <h1 id="x-h" className="font-display text-[32px] leading-10 font-semibold">
              Hồ sơ cần bổ sung
            </h1>
            <p className="text-muted-foreground leading-6">
              Đội kinh doanh chưa thể duyệt hồ sơ này. Vui lòng liên hệ {SITE.hotline} hoặc {SITE.supportEmail} để biết
              thông tin cần bổ sung.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={ROUTES.becomeAgent}>Cập nhật hồ sơ</ButtonLink>
              <ButtonLink href={`mailto:${SITE.supportEmail}`} variant="outline">
                Liên hệ hỗ trợ
              </ButtonLink>
            </div>
          </section>
        )}

        <p className="text-muted-foreground text-center text-sm">
          Cần hỗ trợ gấp? Gọi {SITE.hotline} · {SITE.hotlineHours}
        </p>
      </main>
    </div>
  );
}
