"use client";

import { ETheme } from "domain/enums/ETheme";
import { createContext, useContext, useState, ReactNode } from "react";

interface ThemeContextValue {
  theme: ETheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export default function ThemeProvider({
  initialTheme,
  children,
}: {
  initialTheme: ETheme;
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<ETheme>(initialTheme);

  const toggleTheme = () => {
    const next = theme === "light" ? ETheme.DARK : ETheme.LIGHT;
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    document.cookie = `theme=${next}; path=/; max-age=31536000`;
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
