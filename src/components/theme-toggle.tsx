"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-line bg-[color:var(--panel-soft)] text-[color:var(--text)] transition hover:border-accent hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent/45"
      aria-label={isLight ? "Включить тёмную тему" : "Включить светлую тему"}
      title={isLight ? "Тёмная тема" : "Светлая тема"}
    >
      {isLight ? <Moon size={19} /> : <Sun size={19} />}
    </button>
  );
}
