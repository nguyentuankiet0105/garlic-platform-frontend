import { z } from "zod";

/** Quy tắc mật khẩu theo design: tối thiểu 8 ký tự, có chữ và số. */
export const passwordRule = z
  .string()
  .min(8, "Mật khẩu tối thiểu 8 ký tự")
  .regex(/[A-Za-zÀ-ỹ]/, "Mật khẩu cần có chữ")
  .regex(/\d/, "Mật khẩu cần có số");
