"use client";

import Link from "next/link";
import ThemeSwitcher from "../providers/theme/themeSwitcher";
import Image from "next/image";
import { NavPages } from "@/domain/navPages";
import { usePathname } from "next/navigation";
import Logo from "@/assets/logo.png";
import LoginWidget from "../widgets/loginWidget";

export default function Header() {
  const currentView = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full bg-surface-container-lowest/90 backdrop-blur-md border-b border-surface-container-highest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand / Logo */}
        <div className="flex items-center gap-6">
          <Link
            id="brand-logo-btn"
            href={NavPages.home}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="relative w-60 h-15 rounded-lg overflow-hidden border border-primary/40 p-0.5 bg-surface-container-high transition-transform group-hover:scale-105 group-hover:border-primary">
              <Image
                src={Logo}
                alt="Games Finder Logo"
                className="w-full h-full object-cover rounded"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              id="nav-link-home"
              href={NavPages.home}
              className={`px-3 py-1.5 text-xs font-label-md tracking-wider transition-colors border cursor-pointer ${
                currentView === "home"
                  ? "text-primary bg-primary/10 border-primary/40"
                  : "text-on-surface-variant hover:text-on-surface border-transparent hover:border-surface-container-highest"
              }`}
            >
              HOME
            </Link>
            <Link
              id="nav-link-games-list"
              href={NavPages.games}
              className={`px-3 py-1.5 text-xs font-label-md tracking-wider flex items-center gap-2 transition-colors border cursor-pointer ${
                currentView === "games-list" || currentView === "game-detail"
                  ? "text-primary bg-primary/10 border-primary/40"
                  : "text-on-surface-variant hover:text-on-surface border-transparent hover:border-surface-container-highest"
              }`}
            >
              <span>GAMES_LIST</span>
              <span className="px-1 text-[9px] font-label-sm text-secondary bg-secondary/10 border border-secondary/30 rounded">
                1,517 DB
              </span>
            </Link>
          </nav>
        </div>

        {/* Center/Right: Search bar trigger + Auth/Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Search trigger button */}
          <button
            id="quick-search-trigger"
            // TODO: Add search modal
            // onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-code bg-surface-container-low hover:bg-surface-container border border-surface-container-highest hover:border-primary/50 text-on-surface-variant hover:text-on-surface transition-all cursor-pointer rounded-sm group"
          >
            <span className="text-primary font-bold">{">"}</span>
            <span className="hidden sm:inline">SEARCH REPOSITORY...</span>
            <span className="inline sm:hidden">SEARCH</span>
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[9px] font-label-sm text-on-surface-variant bg-surface-container-highest border border-outline-variant/40 rounded">
              CTRL+K
            </kbd>
          </button>

          <ThemeSwitcher />

          <LoginWidget />
        </div>
      </div>
    </header>
  );
}
