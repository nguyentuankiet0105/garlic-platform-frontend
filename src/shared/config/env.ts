/**
 * Điểm DUY NHẤT đọc process.env. Mọi nơi khác import từ đây.
 * Lưu ý: biến NEXT_PUBLIC_* bị "nướng" vào bundle lúc build (xem frontend-docker-notes).
 */
import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_USE_MOCKS: z
    .enum(["true", "false"])
    .default("true")
    .transform((v) => v === "true"),
  // URL của từng service — chỉ dùng phía SERVER (BFF + server component).
  AUTH_API_URL: z.url().default("http://localhost:3000"),
  CATALOG_API_URL: z.url().default("http://localhost:8000"),
  AGENT_API_URL: z.url().default("http://localhost:8001"),
});

const parsed = schema.parse({
  NEXT_PUBLIC_USE_MOCKS: process.env.NEXT_PUBLIC_USE_MOCKS,
  AUTH_API_URL: process.env.AUTH_API_URL,
  CATALOG_API_URL: process.env.CATALOG_API_URL,
  AGENT_API_URL: process.env.AGENT_API_URL,
});

export const env = {
  USE_MOCKS: parsed.NEXT_PUBLIC_USE_MOCKS,
  services: {
    auth: parsed.AUTH_API_URL,
    catalog: parsed.CATALOG_API_URL,
    agent: parsed.AGENT_API_URL,
  },
} as const;

export type ServiceName = keyof typeof env.services;
