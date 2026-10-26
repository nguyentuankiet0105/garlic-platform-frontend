export type Role = "ADMIN" | "STAFF" | "AGENT";

/** Chỉ có ý nghĩa với AGENT: đại lý mới đăng ký phải chờ admin duyệt. */
export type AccountStatus = "PENDING" | "ACTIVE" | "SUSPENDED" | "REJECTED";

/** Cấp đại lý (T1 Đồng · T2 Bạc · T3 Vàng). Chỉ có với AGENT đã duyệt. */
export type SessionTier = "T1" | "T2" | "T3";

export interface Session {
  userId: string;
  email: string;
  role: Role;
  status: AccountStatus;
  tier?: SessionTier;
  /** epoch seconds */
  expiresAt: number;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
