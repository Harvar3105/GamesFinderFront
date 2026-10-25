import { Doto, Fira_Sans, Google_Sans_Code } from "next/font/google";

// Design system families: Fira Sans (UI text), Doto (logo and headings), Google Sans Code (prices, IDs).
// Each font exposes a CSS variable that globals.css maps to Tailwind's font-sans / font-doto / font-code.

export const firaSans = Fira_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
  variable: "--ff-fira-sans",
  display: "swap",
});

export const doto = Doto({
  subsets: ["latin"],
  weight: "700",
  variable: "--ff-doto",
  display: "swap",
});

export const googleSansCode = Google_Sans_Code({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--ff-google-sans-code",
  display: "swap",
  // next/font has no fallback metrics for this family.
  adjustFontFallback: false,
  fallback: ["monospace"],
});

export const fontVariables = `${firaSans.variable} ${doto.variable} ${googleSansCode.variable}`;
