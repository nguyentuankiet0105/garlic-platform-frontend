import { z } from "zod";
import { passwordRule } from "./password";

export const SHOP_TYPES = ["Tạp hoá / cửa hàng", "Nhà hàng / quán ăn", "Đại lý phân phối", "Siêu thị mini"] as const;
export const PROVINCES = ["Đà Nẵng", "Quảng Nam", "Quảng Ngãi"] as const;
export const VOLUMES = ["Dưới 100kg", "100 – 500kg", "Trên 500kg"] as const;

const digits = (s: string) => s.replace(/\D/g, "");

export const registerSchema = z
  .object({
    shopName: z.string().trim().min(2, "Nhập tên cửa hàng / đại lý"),
    shopType: z.enum(SHOP_TYPES, { error: "Chọn loại hình" }),
    /** MST 10 hoặc 13 chữ số; để trống được (hộ kinh doanh). */
    taxCode: z
      .string()
      .trim()
      .refine((v) => v === "" || [10, 13].includes(digits(v).length), "Mã số thuế gồm 10 hoặc 13 chữ số")
      .optional(),
    province: z.enum(PROVINCES, { error: "Chọn tỉnh / thành" }),
    volume: z.enum(VOLUMES).optional(),
    address: z.string().trim().min(5, "Nhập địa chỉ nhận hàng"),
    fullName: z.string().trim().min(2, "Nhập họ và tên"),
    phone: z.string().refine((v) => /^0\d{9}$/.test(digits(v)), "Số điện thoại cần đủ 10 chữ số"),
    email: z.email("Email không hợp lệ"),
    password: passwordRule,
    confirmPassword: z.string(),
    agree: z.boolean().refine((v) => v, "Bạn cần đồng ý điều khoản để tiếp tục"),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu nhập lại chưa khớp",
  });

export type RegisterInput = z.infer<typeof registerSchema>;
