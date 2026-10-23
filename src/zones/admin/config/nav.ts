import { ROUTES } from "@/shared/config/routes";
import type { NavItem } from "@/shared/components/nav-icons";

export const ADMIN_NAV: NavItem[] = [
  { label: "Tổng quan", href: ROUTES.admin.root, icon: "dashboard", exact: true },
  { label: "Duyệt đại lý", href: ROUTES.admin.agents, icon: "agents" },
  { label: "Sản phẩm & kho", href: ROUTES.admin.products, icon: "products" },
  { label: "Đơn hàng", href: ROUTES.admin.orders, icon: "orders" },
  { label: "Review & bài viết", href: ROUTES.admin.content, icon: "content" },
  { label: "Người dùng & phân quyền", href: ROUTES.admin.users, icon: "users" },
  { label: "Cài đặt", href: ROUTES.admin.settings, icon: "settings" },
];
