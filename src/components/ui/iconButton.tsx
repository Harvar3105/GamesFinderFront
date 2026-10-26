import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";
import Icon, { type IconName } from "./icon";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";

type IconButtonSize = "md" | "sm";

const sizes: Record<IconButtonSize, string> = {
  md: "size-11",
  sm: "size-9",
};

function iconButtonClass(size: IconButtonSize, className?: string) {
  return mergeClassNames(
    "inline-flex shrink-0 items-center justify-center rounded-sm border-0 bg-transparent p-0 text-text hover:bg-component",
    sizes[size],
    className,
  );
}

interface CommonProps {
  icon: IconName;
  label: string;
  size?: IconButtonSize;
  iconSize?: number;
  iconClassName?: string;
  className?: string;
}

type IconButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "aria-label">;

export default function IconButton({
  icon,
  label,
  size = "md",
  iconSize = 24,
  iconClassName,
  className,
  type = "button",
  ...rest
}: IconButtonProps) {
  return (
    <button type={type} aria-label={label} className={iconButtonClass(size, className)} {...rest}>
      <Icon name={icon} size={iconSize} className={iconClassName} />
    </button>
  );
}

interface IconLinkProps extends CommonProps {
  href: string;
}

export function IconLink({
  icon,
  label,
  size = "md",
  iconSize = 24,
  iconClassName,
  className,
  href,
}: IconLinkProps) {
  return (
    <Link href={href} aria-label={label} className={iconButtonClass(size, className)}>
      <Icon name={icon} size={iconSize} className={iconClassName} />
    </Link>
  );
}
