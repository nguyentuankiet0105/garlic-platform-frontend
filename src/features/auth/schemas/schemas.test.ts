import { describe, expect, it } from "vitest";
import { resetSchema } from "./forgot.schema";
import { passwordRule } from "./password";
import { registerSchema } from "./register.schema";

const valid = {
  shopName: "Đại lý Minh Phát",
  shopType: "Tạp hoá / cửa hàng",
  province: "Đà Nẵng",
  address: "12 Lê Duẩn",
  fullName: "Nguyễn Văn Phát",
  phone: "0905 123 456",
  email: "phat@example.com",
  password: "abcd1234",
  confirmPassword: "abcd1234",
  agree: true,
};

describe("passwordRule", () => {
  it("cần ≥ 8 ký tự, có chữ và số", () => {
    expect(passwordRule.safeParse("abc123").success).toBe(false);
    expect(passwordRule.safeParse("abcdefgh").success).toBe(false);
    expect(passwordRule.safeParse("12345678").success).toBe(false);
    expect(passwordRule.safeParse("abcd1234").success).toBe(true);
  });
});

describe("registerSchema", () => {
  it("chấp nhận hồ sơ hợp lệ (MST và nhu cầu có thể bỏ trống)", () => {
    expect(registerSchema.safeParse(valid).success).toBe(true);
    expect(registerSchema.safeParse({ ...valid, taxCode: "" }).success).toBe(true);
  });
  it("SĐT cần đủ 10 chữ số", () => {
    expect(registerSchema.safeParse({ ...valid, phone: "0905 12" }).success).toBe(false);
  });
  it("MST phải 10 hoặc 13 chữ số", () => {
    expect(registerSchema.safeParse({ ...valid, taxCode: "12345" }).success).toBe(false);
    expect(registerSchema.safeParse({ ...valid, taxCode: "0123456789" }).success).toBe(true);
    expect(registerSchema.safeParse({ ...valid, taxCode: "0123456789012" }).success).toBe(true);
  });
  it("mật khẩu nhập lại phải khớp", () => {
    const r = registerSchema.safeParse({ ...valid, confirmPassword: "khac1234" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0].path).toEqual(["confirmPassword"]);
  });
  it("bắt buộc đồng ý điều khoản", () => {
    expect(registerSchema.safeParse({ ...valid, agree: false }).success).toBe(false);
  });
});

describe("resetSchema", () => {
  it("mật khẩu mới phải khớp và đạt quy tắc", () => {
    expect(resetSchema.safeParse({ password: "abcd1234", confirmPassword: "abcd1234" }).success).toBe(true);
    expect(resetSchema.safeParse({ password: "abcd1234", confirmPassword: "abcd12345" }).success).toBe(false);
  });
});
