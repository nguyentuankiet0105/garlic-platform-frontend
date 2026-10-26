"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CircleCheck, TimerOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { ROUTES } from "@/shared/config/routes";
import { Button, ButtonLink, Field, PasswordInput, describedBy } from "@/shared/ui";
import { authApi } from "../api/auth.api";
import { resetSchema, type ResetInput } from "../schemas/forgot.schema";

function Expired() {
  return (
    <div role="alert" className="grid justify-items-center gap-3 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-danger-50 text-danger-600">
        <TimerOff className="size-7" aria-hidden />
      </span>
      <h1 className="font-display text-[28px] leading-9 font-semibold">Liên kết đã hết hạn</h1>
      <p className="text-muted-foreground leading-6">
        Liên kết đặt lại mật khẩu không còn hiệu lực hoặc đã được dùng. Hãy yêu cầu liên kết mới.
      </p>
      <ButtonLink href={ROUTES.forgotPassword}>Gửi lại liên kết</ButtonLink>
    </div>
  );
}

/** `token` lấy từ ?token= của liên kết trong email. Thiếu token hoặc backend báo 400 → màn "hết hạn". */
export function ResetForm({ token }: { token?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetInput>({ resolver: zodResolver(resetSchema) });
  const save = useMutation({
    mutationFn: (v: ResetInput) => authApi.resetPassword({ token: token ?? "", password: v.password }),
  });

  if (!token || (save.error && "status" in save.error && save.error.status === 400)) return <Expired />;

  if (save.isSuccess) {
    return (
      <div role="status" className="grid justify-items-center gap-3 text-center">
        <span className="bg-primary-soft text-primary-soft-foreground grid size-14 place-items-center rounded-full">
          <CircleCheck className="size-7" aria-hidden />
        </span>
        <h1 className="font-display text-[28px] leading-9 font-semibold">Đã đổi mật khẩu</h1>
        <p className="text-muted-foreground">Bạn có thể đăng nhập bằng mật khẩu mới.</p>
        <ButtonLink href={ROUTES.login}>Đăng nhập</ButtonLink>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit((v) => save.mutate(v))} noValidate aria-labelledby="r-h" className="grid gap-5">
      <div className="grid gap-1.5">
        <h1 id="r-h" className="font-display text-[28px] leading-9 font-semibold">
          Đặt mật khẩu mới
        </h1>
        <p className="text-muted-foreground text-sm">Tối thiểu 8 ký tự, có chữ và số.</p>
      </div>
      {save.error && (
        <p role="alert" className="text-danger-600 text-sm">
          {save.error.message}
        </p>
      )}
      <Field id="password" label="Mật khẩu mới" error={errors.password?.message}>
        <PasswordInput
          id="password"
          autoComplete="new-password"
          aria-invalid={!!errors.password}
          aria-describedby={describedBy("password", { error: !!errors.password })}
          {...register("password")}
        />
      </Field>
      <Field id="confirmPassword" label="Nhập lại mật khẩu" error={errors.confirmPassword?.message}>
        <PasswordInput
          id="confirmPassword"
          autoComplete="new-password"
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={describedBy("confirmPassword", { error: !!errors.confirmPassword })}
          {...register("confirmPassword")}
        />
      </Field>
      <Button type="submit" size="lg" disabled={save.isPending}>
        {save.isPending ? "Đang cập nhật…" : "Cập nhật mật khẩu"}
      </Button>
    </form>
  );
}
