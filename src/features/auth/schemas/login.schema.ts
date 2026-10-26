import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  /** "Ghi nhớ trên thiết bị này": false → refresh cookie chỉ sống đến khi đóng trình duyệt. */
  remember: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
