import type { AccountStatus, Role } from "../types";

/** Tài khoản demo khi NEXT_PUBLIC_USE_MOCKS=true — để click thử đủ 3 zone khi backend chưa xong. */
export const MOCK_ACCOUNTS: Record<string, { role: Role; status: AccountStatus; label: string }> = {
  "admin@demo.vn": { role: "ADMIN", status: "ACTIVE", label: "Admin" },
  "staff@demo.vn": { role: "STAFF", status: "ACTIVE", label: "Nhân viên" },
  "agent@demo.vn": { role: "AGENT", status: "ACTIVE", label: "Đại lý (đã duyệt)" },
  "pending@demo.vn": { role: "AGENT", status: "PENDING", label: "Đại lý (chờ duyệt)" },
};
