import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // ---- Ranh giới kiến trúc: app → zones → features → shared (chỉ được import "xuống dưới") ----
  {
    files: ["src/shared/**"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [
        { group: ["@/features/*", "@/zones/*", "@/app/*"], message: "shared không được phụ thuộc features/zones/app." },
      ] }],
    },
  },
  {
    files: ["src/features/**"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [
        { group: ["@/zones/*", "@/app/*"], message: "features không được phụ thuộc zones/app." },
      ] }],
    },
  },
  {
    files: ["src/zones/**"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [
        { group: ["@/app/*"], message: "zones không được phụ thuộc app." },
        { group: ["@/zones/*"], message: "zone không import chéo zone khác — dùng shared hoặc feature." },
      ] }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
