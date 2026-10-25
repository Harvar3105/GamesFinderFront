"use client";

import { IconButton } from "@/components/ui";
import { ETheme } from "@/domain/entities/enums/ETheme";
import { useTheme } from "./themeProvider";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === ETheme.DARK;

  return (
    <IconButton
      icon={isDark ? "sunny" : "moon_stars"}
      label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggleTheme}
    />
  );
}
