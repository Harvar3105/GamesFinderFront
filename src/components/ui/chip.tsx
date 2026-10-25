import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  /** Code font, for IDs. */
  mono?: boolean;
}

export default function Chip({ mono = false, className, ...rest }: ChipProps) {
  return (
    <span
      className={mergeClassNames(
        "inline-flex items-center whitespace-nowrap rounded-full bg-component px-related-sm py-related-xs text-sm leading-[1.2]",
        mono ? "font-code" : "font-sans",
        className,
      )}
      {...rest}
    />
  );
}

interface ChipToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-pressed"> {
  selected: boolean;
}

export function ChipToggle({ selected, className, type = "button", ...rest }: ChipToggleProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={mergeClassNames(
        "min-h-8 whitespace-nowrap rounded-full border px-related-sm font-sans text-sm leading-none text-text transition-colors duration-150",
        selected
          ? "border-text bg-primary font-semibold"
          : "border-transparent bg-component hover:bg-component-hover",
        className,
      )}
      {...rest}
    />
  );
}
