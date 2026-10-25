import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";

export default function Chip({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={mergeClassNames(
        "inline-flex items-center whitespace-nowrap rounded-full bg-component px-related-sm py-related-xs font-sans text-sm leading-[1.2]",
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
