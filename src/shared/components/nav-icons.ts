import {
  BarChart3,
  BookOpen,
  ClipboardList,
  CreditCard,
  FileText,
  LayoutDashboard,
  Package,
  Receipt,
  RefreshCw,
  Settings,
  ShoppingCart,
  Store,
  Tags,
  UserCog,
  UserRound,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/**
 * Registry icon cho sidebar. Server component không truyền được component function xuống client,
 * nên nav config chỉ chứa TÊN icon (string) và client SidebarNav tra cứu ở đây.
 */
export const NAV_ICONS = {
  dashboard: LayoutDashboard,
  catalog: Store,
  cart: ShoppingCart,
  orders: ClipboardList,
  reorder: RefreshCw,
  debt: Wallet,
  pricing: Tags,
  account: UserRound,
  agents: Users,
  products: Package,
  content: BookOpen,
  users: UserCog,
  settings: Settings,
  reports: BarChart3,
  invoice: Receipt,
  payment: CreditCard,
  doc: FileText,
} satisfies Record<string, LucideIcon>;

export type NavIconName = keyof typeof NAV_ICONS;
export interface NavItem {
  label: string;
  href: string;
  icon: NavIconName;
  /** true: chỉ active khi khớp chính xác (dùng cho trang tổng quan) */
  exact?: boolean;
}
