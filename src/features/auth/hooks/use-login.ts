"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/auth.api";
import type { LoginInput } from "../schemas/login.schema";

export function useLogin(redirectTo?: string) {
  const router = useRouter();
  return useMutation({
    mutationFn: (input: LoginInput) => authApi.login(input),
    onSuccess: ({ next }) => {
      router.replace(redirectTo || next);
      router.refresh(); // để server component đọc lại cookie mới
    },
  });
}
