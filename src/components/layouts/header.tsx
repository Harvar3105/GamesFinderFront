"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isAdmin } from "@/components/helpers/userRoles";
import ThemeSwitcher from "@/components/providers/theme/themeSwitcher";
import { useUser } from "@/components/providers/userProvider";
import { NavLink } from "@/components/ui";
import LoginWidget from "@/components/widgets/loginWidget";
import { NavPages } from "@/domain/navPages";

function isActive(pathname: string, href: string): boolean {
  if (href === NavPages.home) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const { user, isLoggedIn } = useUser();

  const links = [
    { href: NavPages.home, label: "Home" },
    { href: NavPages.catalog, label: "Catalog" },
    ...(isLoggedIn() ? [{ href: NavPages.account, label: "Account" }] : []),
    ...(isAdmin(user) ? [{ href: NavPages.admin, label: "Administration" }] : []),
  ];

  return (
    // relative z-10: keeps the shadow above the page content.
    <header className="relative z-10 flex flex-wrap items-center justify-between gap-related-lg bg-container px-edge-x py-related-md shadow-container">
      <Link href={NavPages.home} className="no-underline typo-logo" aria-label="GamesFinder — home">
        GamesFinder
      </Link>

      <nav aria-label="Main navigation" className="flex flex-wrap gap-related-sm">
        {links.map((link) => (
          <NavLink key={link.href} href={link.href} active={isActive(pathname, link.href)}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex flex-wrap items-center gap-related-sm">
        <ThemeSwitcher />
        <LoginWidget />
      </div>
    </header>
  );
}
