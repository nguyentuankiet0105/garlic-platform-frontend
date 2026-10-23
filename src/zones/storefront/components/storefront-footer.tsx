import Link from "next/link";
import { ROUTES } from "@/shared/config/routes";
import { SITE } from "@/shared/config/site";
import { Container, Logo } from "@/shared/ui";

export function StorefrontFooter() {
  return (
    <footer className="bg-brand-950 text-brand-100 mt-24">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="grid content-start gap-4">
          <Logo inverted />
          <p className="text-brand-200/80 max-w-sm text-sm">{SITE.tagline}</p>
        </div>
        <div className="grid content-start gap-2 text-sm">
          <p className="font-semibold text-white">Khám phá</p>
          <Link className="text-brand-200/80 hover:text-white" href={ROUTES.storefront.products}>
            Sản phẩm
          </Link>
          <Link className="text-brand-200/80 hover:text-white" href={ROUTES.storefront.guides}>
            Hướng dẫn & review
          </Link>
          <Link className="text-brand-200/80 hover:text-white" href={ROUTES.becomeAgent}>
            Trở thành đại lý
          </Link>
        </div>
        <div className="grid content-start gap-2 text-sm">
          <p className="font-semibold text-white">Liên hệ</p>
          <span className="text-brand-200/80">{SITE.supportEmail}</span>
          <span className="text-brand-200/80">{SITE.hotline}</span>
        </div>
      </Container>
      <div className="text-brand-200/60 border-t border-white/10 py-4 text-center text-xs">
        © {new Date().getFullYear()} {SITE.name} — dự án thực hành cá nhân
      </div>
    </footer>
  );
}
