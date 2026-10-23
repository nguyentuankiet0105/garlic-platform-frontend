import { ROUTES } from "@/shared/config/routes";

export const STOREFRONT_NAV = [
  { label: "Sản phẩm", href: ROUTES.storefront.products },
  { label: "Hướng dẫn & review", href: ROUTES.storefront.guides },
  { label: "Trở thành đại lý", href: ROUTES.becomeAgent },
] as const;
