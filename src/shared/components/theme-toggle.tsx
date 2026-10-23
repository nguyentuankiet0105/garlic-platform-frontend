"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/shared/providers/theme-provider";

/** Nút bật/tắt dark mode, dùng chung ở header. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
      aria-pressed={isDark}
      className="border-border hover:bg-muted text-foreground relative grid size-9 shrink-0 place-items-center rounded-lg border transition-colors"
    >
      <Sun className="size-[18px] scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-[18px] scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0" />
    </button>
  );
}
