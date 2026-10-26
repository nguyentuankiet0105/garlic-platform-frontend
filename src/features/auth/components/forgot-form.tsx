"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { env } from "@/shared/config/env";
import { ROUTES } from "@/shared/config/routes";
import { SITE } from "@/shared/config/site";
import { Alert, Button, ButtonLink, Field, Input, describedBy } from "@/shared/ui";
import { authApi } from "../api/auth.api";
import { forgotSchema, type ForgotInput } from "../schemas/forgot.schema";

export function ForgotForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotInput>({ resolver: zodResolver(forgotSchema) });
  const send = useMutation({ mutationFn: authApi.forgotPassword });

  if (send.isSuccess) {
    return (
      <div role="status" className="grid justify-items-center gap-3 text-center">
        <span className="bg-primary-soft text-primary-soft-foreground grid size-14 place-items-center rounded-full">
          <MailCheck className="size-7" aria-hidden />
        </span>
        <h1 className="font-display text-[28px] leading-9 font-semibold">Kiểm tra email của bạn</h1>
        <p className="text-muted-foreground leading-6">
          Nếu email này đã đăng ký, bạn sẽ nhận được liên kết đặt lại mật khẩu trong vài phút. Liên kết có hiệu lực trong{" "}
          {SITE.policy.resetLinkTtl}.
        </p>
        {env.USE_MOCKS && (
          <ButtonLink href={`${ROUTES.resetPassword}?token=demo`} variant="outline">
            Mở liên kết trong email (demo)
          </ButtonLink>
        )}
        <Link href={ROUTES.login} className="text-sm font-semibold">
          ← Quay lại đăng nhập
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit((v) => send.mutate(v))} noValidate aria-labelledby="f-h" className="grid gap-5">
      <div className="grid gap-1.5">
        <h1 id="f-h" className="font-display text-[28px] leading-9 font-semibold">
          Quên mật khẩu?
        </h1>
        <p className="text-muted-foreground text-sm leading-5">
          Nhập email đã đăng ký, chúng tôi sẽ gửi liên kết đặt lại mật khẩu.
        </p>
      </div>
      {send.error && <Alert tone="danger">{send.error.message}</Alert>}
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
      <Button type="submit" size="lg" disabled={send.isPending}>
        {send.isPending ? "Đang gửi…" : "Gửi liên kết đặt lại"}
      </Button>
      <Link href={ROUTES.login} className="text-center text-sm font-semibold">
        ← Quay lại đăng nhập
      </Link>
    </form>
  );
}
