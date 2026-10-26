export type LoginErrorKind = "invalid" | "inactive" | "throttled" | "unknown";

/** Lỗi gọi BFF /api/auth/* — giữ status để UI chọn đúng thông báo. */
export class AuthRequestError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "AuthRequestError";
  }
}

/**
 * Map HTTP status của Auth service → trạng thái hiển thị (design: Login có 4 trạng thái).
 *  401 sai email/mật khẩu · 403 tài khoản bị vô hiệu hoá (isActive=false) · 429 bị rate limit.
 */
export function classifyLoginError(status: number | undefined): LoginErrorKind {
  if (status === 401 || status === 400) return "invalid";
  if (status === 403) return "inactive";
  if (status === 429) return "throttled";
  return "unknown";
}
