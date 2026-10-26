"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ROUTES } from "@/shared/config/routes";
import { SITE } from "@/shared/config/site";
import { Alert, Button, Checkbox, Field, Input, PasswordInput, describedBy } from "@/shared/ui";
import { useLogin } from "../hooks/use-login";
import { classifyLoginError, AuthRequestError } from "../lib/login-error";
import { loginSchema, type LoginInput } from "../schemas/login.schema";
import { GoogleSoonButton, OrDivider } from "./google-button";

export function LoginForm({ next }: { next?: string }) {
  const login = useLogin(next);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema), defaultValues: { remember: true } });

  const kind = login.error ? classifyLoginError(login.error instanceof AuthRequestError ? login.error.status : undefined) : null;

  return (
    <form onSubmit={handleSubmit((v) => login.mutate(v))} className="grid gap-4" noValidate aria-labelledby="l-title">
      {kind === "invalid" && <Alert tone="danger">Email hoặc mật khẩu chưa đúng. Vui lòng kiểm tra lại.</Alert>}
      {kind === "inactive" && (
        <Alert tone="danger">Tài khoản đang bị vô hiệu hoá. Vui lòng liên hệ {SITE.hotline} để được hỗ trợ.</Alert>
      )}
      {kind === "throttled" && (
        <Alert tone="warning">Bạn đã thử quá nhiều lần. Vui lòng thử lại sau ít phút hoặc đặt lại mật khẩu.</Alert>
      )}
      {kind === "unknown" && <Alert tone="danger">{login.error?.message || "Đăng nhập thất bại. Vui lòng thử lại."}</Alert>}

      <GoogleSoonButton label="Đăng nhập với Google" />
      <OrDivider />

      <Field id="email" label="Email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={describedBy("email", { error: !!errors.email })}
          {...register("email")}
        />
      </Field>
      <Field
        id="password"
        label="Mật khẩu"
        error={errors.password?.message}
        action={
          <Link href={ROUTES.forgotPassword} className="text-sm font-semibold">
            Quên mật khẩu?
          </Link>
        }
      >
        <PasswordInput
          id="password"
          autoComplete="current-password"
          aria-invalid={!!errors.password}
          aria-describedby={describedBy("password", { error: !!errors.password })}
          {...register("password")}
        />
      </Field>

      <label className="flex min-h-11 cursor-pointer items-center gap-2.5 text-sm">
        <Checkbox {...register("remember")} />
        Ghi nhớ trên thiết bị này
      </label>

      <Button type="submit" size="lg" disabled={login.isPending}>
        {login.isPending ? "Đang đăng nhập…" : "Đăng nhập"}
      </Button>
    </form>
  );
}
