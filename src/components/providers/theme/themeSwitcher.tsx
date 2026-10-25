"use client";

import { useTheme } from "./themeProvider";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      id="theme-switcher-btn"
      type="button"
      onClick={toggleTheme}
      className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-code bg-surface-container-low hover:bg-surface-container border border-surface-container-highest hover:border-primary/50 text-on-surface-variant hover:text-on-surface rounded-sm transition-all cursor-pointer select-none group min-w-[58px] max-w-[68px]"
      title={`Toggle Theme Mode [Current: ${theme.toUpperCase()}]`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? (
        <>
          <svg
            className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
          </svg>
          <span className="text-[11px] font-label-sm font-semibold tracking-wider text-primary">
            DRK
          </span>
        </>
      ) : (
        <>
          <svg
            className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
          <span className="text-[11px] font-label-sm font-semibold tracking-wider text-secondary">
            LIT
          </span>
        </>
      )}
    </button>
  );
}
