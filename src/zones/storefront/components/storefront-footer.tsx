import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/shared/config/routes";
import { SITE } from "@/shared/config/site";
import { Container, Logo } from "@/shared/ui";

const link = "text-brand-100/80 hover:text-white text-sm transition-colors";

export function StorefrontFooter() {
  return (
    <footer className="bg-brand-950 text-brand-100 mt-24">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="grid content-start gap-4">
          <Logo inverted />
          <p className="text-brand-100/80 max-w-sm text-sm leading-6">{SITE.tagline}</p>
        </div>
        <nav aria-label="Khám phá" className="grid content-start gap-2.5">
          <p className="font-semibold text-white">Khám phá</p>
          <Link className={link} href={ROUTES.storefront.products}>Sản phẩm</Link>
          <Link className={link} href={ROUTES.storefront.guides}>Hướng dẫn & review</Link>
          <Link className={link} href={ROUTES.becomeAgent}>Trở thành đại lý</Link>
        </nav>
        <nav aria-label="Tài khoản" className="grid content-start gap-2.5">
          <p className="font-semibold text-white">Tài khoản</p>
          <Link className={link} href={ROUTES.login}>Đăng nhập</Link>
          <Link className={link} href={ROUTES.forgotPassword}>Quên mật khẩu</Link>
        </nav>
        <div className="grid content-start gap-2.5">
          <p className="font-semibold text-white">Liên hệ</p>
          <a className={`${link} inline-flex items-center gap-2`} href={`mailto:${SITE.supportEmail}`}>
            <Mail className="size-4" aria-hidden />
            {SITE.supportEmail}
          </a>
          <a className={`${link} inline-flex items-center gap-2`} href={`tel:${SITE.hotline.replace(/\s/g, "")}`}>
            <Phone className="size-4" aria-hidden />
            {SITE.hotline}
          </a>
          <p className="text-brand-100/60 text-xs">{SITE.hotlineHours}</p>
        </div>
      </Container>
      <div className="text-brand-100/60 border-t border-white/10 py-4 text-center text-xs">
        © {new Date().getFullYear()} {SITE.name} — dự án thực hành cá nhân
      </div>
    </footer>
  );
}
