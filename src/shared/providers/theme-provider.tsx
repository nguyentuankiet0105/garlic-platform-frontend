"use client";

import { createContext, useCallback, useContext, useSyncExternalStore, type ReactNode } from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "theme";
const listeners = new Set<() => void>();

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

// Server không biết theme thật (phụ thuộc localStorage/prefers-color-scheme của client),
// nên trả "light" tạm cho SSR — script inline trong layout.tsx set class trước khi hydrate,
// và useSyncExternalStore sẽ tự đồng bộ lại theo DOM thật ngay sau đó.
function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

function setThemeClass(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  window.localStorage.setItem(STORAGE_KEY, theme);
  listeners.forEach((listener) => listener());
}

/**
 * Quản lý theme light/dark, đồng bộ với class "dark" trên <html> qua useSyncExternalStore
 * (DOM là nguồn sự thật, tránh set state thủ công trong effect).
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    setThemeClass(getSnapshot() === "dark" ? "light" : "dark");
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme phải được dùng trong ThemeProvider");
  return ctx;
}
