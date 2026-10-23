import { ROUTES } from "@/shared/config/routes";
import type { NavItem } from "@/shared/components/nav-icons";

export const AGENT_NAV: NavItem[] = [
  { label: "Tổng quan", href: ROUTES.agent.root, icon: "dashboard", exact: true },
  { label: "Sản phẩm & giá sỉ", href: ROUTES.agent.catalog, icon: "catalog" },
  { label: "Giỏ hàng", href: ROUTES.agent.cart, icon: "cart" },
  { label: "Đơn hàng", href: ROUTES.agent.orders, icon: "orders" },
  { label: "Đặt lại nhanh", href: ROUTES.agent.reorder, icon: "reorder" },
  { label: "Công nợ & thanh toán", href: ROUTES.agent.debt, icon: "debt" },
  { label: "Cấp đại lý", href: ROUTES.agent.pricing, icon: "pricing" },
  { label: "Tài khoản", href: ROUTES.agent.account, icon: "account" },
];
