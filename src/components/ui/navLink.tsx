import Link from "next/link";
import type { ReactNode } from "react";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";

interface NavLinkProps {
  href: string;
  active: boolean;
  children: ReactNode;
}

export default function NavLink({ href, active, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={mergeClassNames(
        "inline-flex min-h-11 items-center rounded-sm border px-related-md no-underline",
        active ? "border-text font-semibold" : "border-transparent hover:bg-component",
      )}
    >
      {children}
    </Link>
  );
}
