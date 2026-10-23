export type Role = "ADMIN" | "STAFF" | "AGENT";

/** Chỉ có ý nghĩa với AGENT: đại lý mới đăng ký phải chờ admin duyệt. */
export type AccountStatus = "PENDING" | "ACTIVE" | "SUSPENDED";

export interface Session {
  userId: string;
  email: string;
  role: Role;
  status: AccountStatus;
  /** epoch seconds */
  expiresAt: number;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
