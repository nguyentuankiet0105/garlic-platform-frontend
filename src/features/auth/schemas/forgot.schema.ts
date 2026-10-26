import { z } from "zod";
import { passwordRule } from "./password";

export const forgotSchema = z.object({ email: z.email("Email không hợp lệ") });
export type ForgotInput = z.infer<typeof forgotSchema>;

export const resetSchema = z
  .object({ password: passwordRule, confirmPassword: z.string() })
  .refine((v) => v.password === v.confirmPassword, { path: ["confirmPassword"], message: "Mật khẩu nhập lại chưa khớp" });
export type ResetInput = z.infer<typeof resetSchema>;
