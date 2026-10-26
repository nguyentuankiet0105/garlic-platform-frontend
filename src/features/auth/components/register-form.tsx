"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Alert, Button, Checkbox, Field, Input, PasswordInput, Select, describedBy } from "@/shared/ui";
import { authApi } from "../api/auth.api";
import {
  PROVINCES,
  SHOP_TYPES,
  VOLUMES,
  registerSchema,
  type RegisterInput,
} from "../schemas/register.schema";
import { GoogleSoonButton, OrDivider } from "./google-button";

export function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { shopType: SHOP_TYPES[0], province: PROVINCES[0], agree: false },
  });

  const submit = useMutation({
    mutationFn: (v: RegisterInput) => authApi.register(v),
    onSuccess: ({ next }) => {
      router.replace(next);
      router.refresh();
    },
  });

  const bind = (name: keyof RegisterInput, hint?: boolean) => ({
    "aria-invalid": !!errors[name],
    "aria-describedby": describedBy(name, { hint, error: !!errors[name] }),
  });
  const err = (name: keyof RegisterInput) => errors[name]?.message as string | undefined;

  return (
    <form
      onSubmit={handleSubmit((v) => submit.mutate(v))}
      noValidate
      aria-labelledby="f-title"
      className="border-border bg-card grid gap-6 rounded-3xl border p-6 sm:p-8"
    >
      <div className="grid gap-4">
        <h2 id="f-title" className="font-display text-[26px] leading-8 font-semibold">
          Hồ sơ đại lý
        </h2>
        <GoogleSoonButton label="Đăng ký với Google" />
        <OrDivider>hoặc điền hồ sơ</OrDivider>
      </div>

      {submit.error && <Alert tone="danger">{submit.error.message}</Alert>}

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-3 text-base font-bold">Thông tin cửa hàng</legend>
        <Field id="shopName" label="Tên cửa hàng / đại lý" required error={err("shopName")}>
          <Input id="shopName" autoComplete="organization" {...bind("shopName")} {...register("shopName")} />
        </Field>
        <Field id="shopType" label="Loại hình" required error={err("shopType")}>
          <Select id="shopType" {...bind("shopType")} {...register("shopType")}>
            {SHOP_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </Field>
        <Field id="taxCode" label="Mã số thuế" hint="Không bắt buộc với hộ kinh doanh" error={err("taxCode")}>
          <Input id="taxCode" inputMode="numeric" placeholder="10 hoặc 13 chữ số" {...bind("taxCode", true)} {...register("taxCode")} />
        </Field>
        <Field id="province" label="Tỉnh / thành" required error={err("province")}>
          <Select id="province" {...bind("province")} {...register("province")}>
            {PROVINCES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </Field>
        <Field id="volume" label="Nhu cầu dự kiến / tháng">
          <Select id="volume" defaultValue="" {...register("volume", { setValueAs: (v) => v || undefined })}>
            <option value="">Chưa xác định</option>
            {VOLUMES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </Field>
        <Field id="address" label="Địa chỉ nhận hàng" required error={err("address")}>
          <Input
            id="address"
            autoComplete="street-address"
            placeholder="Số nhà, đường, phường/xã"
            {...bind("address")}
            {...register("address")}
          />
        </Field>
      </fieldset>

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-3 text-base font-bold">Người liên hệ &amp; tài khoản</legend>
        <Field id="fullName" label="Họ và tên" required error={err("fullName")}>
          <Input id="fullName" autoComplete="name" {...bind("fullName")} {...register("fullName")} />
        </Field>
        <Field id="phone" label="Số điện thoại" required error={err("phone")}>
          <Input id="phone" type="tel" autoComplete="tel" {...bind("phone")} {...register("phone")} />
        </Field>
        <Field id="email" label="Email" required hint="Kết quả duyệt sẽ gửi về email này" error={err("email")}>
          <Input id="email" type="email" autoComplete="email" {...bind("email", true)} {...register("email")} />
        </Field>
        <div className="hidden sm:block" />
        <Field id="password" label="Mật khẩu" required hint="Tối thiểu 8 ký tự, có chữ và số" error={err("password")}>
          <PasswordInput id="password" autoComplete="new-password" {...bind("password", true)} {...register("password")} />
        </Field>
        <Field id="confirmPassword" label="Nhập lại mật khẩu" required error={err("confirmPassword")}>
          <PasswordInput
            id="confirmPassword"
            autoComplete="new-password"
            {...bind("confirmPassword")}
            {...register("confirmPassword")}
          />
        </Field>
      </fieldset>

      <div className="grid gap-1.5">
        <label className="flex cursor-pointer items-start gap-2.5 py-1 text-sm leading-6">
          <Checkbox className="mt-1" {...bind("agree")} {...register("agree")} />
          <span>
            Tôi đồng ý với <Link href="#" className="font-semibold">điều khoản đại lý</Link> và{" "}
            <Link href="#" className="font-semibold">chính sách công nợ</Link>.
          </span>
        </label>
        {errors.agree && (
          <p role="alert" className="text-danger-600 text-xs">
            {errors.agree.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={submit.isPending}>
          {submit.isPending ? "Đang gửi hồ sơ…" : "Gửi hồ sơ đăng ký"}
        </Button>
        <span className="text-muted-foreground text-[13px]">
          <span className="text-danger-600" aria-hidden>*</span> Bắt buộc
        </span>
      </div>
    </form>
  );
}
