import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex min-h-11 items-center justify-center gap-related-xs whitespace-nowrap rounded-sm border-0 px-related-lg text-text no-underline typo-button " +
  "hover:outline-offset-0 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary hover:outline-2 hover:outline-text",
  secondary: "bg-component hover:outline-1 hover:outline-text",
  ghost: "bg-transparent hover:outline-1 hover:outline-text",
};

export function buttonClass(variant: ButtonVariant = "secondary", className?: string): string {
  return mergeClassNames(base, variants[variant], className);
}

interface CommonProps {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ variant, className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, className)} {...rest} />;
}

type ButtonLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

export function ButtonLink({ variant, className, href, ...rest }: ButtonLinkProps) {
  const classes = buttonClass(variant, className);

  if (isExternal(href)) {
    return <a href={href} className={classes} {...rest} />;
  }

  return <Link href={href} className={classes} {...rest} />;
}
