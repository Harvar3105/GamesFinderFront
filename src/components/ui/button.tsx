import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "compact";

const base =
  "inline-flex min-h-11 items-center justify-center gap-related-xs whitespace-nowrap rounded-sm border-0 text-text no-underline typo-button " +
  "hover:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary hover:outline-2 hover:outline-text",
  secondary: "bg-component hover:outline-1 hover:outline-text",
  ghost: "bg-transparent hover:outline-1 hover:outline-text",
};

const sizes: Record<ButtonSize, string> = {
  md: "px-related-lg",
  compact: "min-w-11 px-related-sm",
};

export function buttonClass(
  variant: ButtonVariant = "secondary",
  className?: string,
  size: ButtonSize = "md",
): string {
  return mergeClassNames(base, variants[variant], sizes[size], className);
}

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant,
  size,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return <button type={type} className={buttonClass(variant, className, size)} {...rest} />;
}

type ButtonLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

export function ButtonLink({ variant, size, className, href, ...rest }: ButtonLinkProps) {
  const classes = buttonClass(variant, className, size);

  if (isExternal(href)) {
    return <a href={href} className={classes} {...rest} />;
  }

  return <Link href={href} className={classes} {...rest} />;
}
