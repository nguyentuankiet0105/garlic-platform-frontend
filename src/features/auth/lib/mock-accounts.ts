import type { AccountStatus, Role, SessionTier } from "../types";

export interface MockAccount {
  role: Role;
  status: AccountStatus;
  label: string;
  tier?: SessionTier;
  /** Mô phỏng lỗi của Auth service để xem đủ trạng thái màn hình Login. */
  fail?: "inactive" | "throttled";
}

/** Tài khoản demo khi NEXT_PUBLIC_USE_MOCKS=true — để click thử đủ 3 zone khi backend chưa xong. */
export const MOCK_ACCOUNTS: Record<string, MockAccount> = {
  "admin@demo.vn": { role: "ADMIN", status: "ACTIVE", label: "Admin" },
  "staff@demo.vn": { role: "STAFF", status: "ACTIVE", label: "Nhân viên" },
  "agent@demo.vn": { role: "AGENT", status: "ACTIVE", label: "Đại lý Vàng (đã duyệt)", tier: "T3" },
  "pending@demo.vn": { role: "AGENT", status: "PENDING", label: "Đại lý (chờ duyệt)" },
  "rejected@demo.vn": { role: "AGENT", status: "REJECTED", label: "Đại lý (hồ sơ cần bổ sung)" },
  "locked@demo.vn": { role: "AGENT", status: "ACTIVE", label: "Tài khoản bị vô hiệu hoá", fail: "inactive" },
  "throttle@demo.vn": { role: "AGENT", status: "ACTIVE", label: "Thử quá nhiều lần", fail: "throttled" },
};
