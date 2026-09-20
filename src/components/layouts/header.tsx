"use client";

import Link from "next/link";
import ThemeSwitcher from "../providers/theme/themeSwitcher";
import Image from "next/image";
import { NavPages } from "@/domain/navPages";
import { useUser } from "../providers/userProvider";
import { usePathname } from "next/navigation";

export default function Header() {
  const { user, logout, isLoggedIn } = useUser();
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
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-primary/40 p-0.5 bg-surface-container-high transition-transform group-hover:scale-105 group-hover:border-primary">
              <Image
                src="https://lh3.googleusercontent.com/aida/AEtjO1Xibn0jxlRZgOpuMWqqNFrIDomJiLroxAPAfAJorvNFECjc4FoHtw71Bbuekb5mKLRqDvhAG9n9uu8KaAZaRTSrMz22Il8A_ewdbavcXYr7yxxzBXJPOXBKChblb_aviOKGIDDqc02AuSQrRx4GkYwZ_pKp087Y_BKbJsGMmJpd4QgtUQkJSNlRiFxDcfulAx1aPG6ytXBe4qZpiOhgugqMZmdXZfcmmMaWTJg9Wrr1ni7KsqAiaYhFNw"
                alt="Games Finder Logo"
                className="w-full h-full object-cover rounded"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bitcount text-lg sm:text-xl font-bold tracking-wider text-primary group-hover:text-primary-container transition-colors">
                  GAMES FINDER
                </span>
                <span className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-label-sm font-semibold tracking-wider text-tertiary bg-tertiary/10 border border-tertiary/30 rounded">
                  v2.0
                </span>
              </div>
              <p className="text-[10px] font-code tracking-widest text-on-surface-variant uppercase hidden xs:block">
                RADAR // PRICE_TRACKER
              </p>
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

          {/* User Status / Profile */}
          {isLoggedIn() ? (
            <div className="flex items-center gap-2">
              <Link
                id="user-profile-header-btn"
                href={NavPages.profile}
                className={`flex items-center gap-2.5 px-2.5 py-1 rounded border transition-all cursor-pointer ${
                  currentView === "user-profile"
                    ? "border-tertiary bg-tertiary/10 text-tertiary"
                    : "border-surface-container-highest bg-surface-container-low hover:border-primary/40 text-on-surface"
                }`}
                title="Access Operator Terminal"
              >
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-outline-variant/60">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG1YjP1grjKCXXflLJoxfGq6a-8f1rqPJq0gG602Swsa3QQzuEnlkfM8IdWwGEJZWeymxvT_w6cvJ6kR2ErjoytwS5nYibzyttcp0NGmI2PYZotR5ArT-V79eHr4PirQsK8ob4eezwleatFPWmF7KijlUHJJI5IfaJOUGu-CX06BaM7dWZvIDPRt9RSpiMTOp4EON2M_3OEEnYq7Jk47FcM3zz5KD13vMls6oZ8ZB1wNFHOne8mtxZ"
                    alt={user?.avatarName ?? "No avatar"}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-tertiary ring-1 ring-surface-container-lowest animate-pulse" />
                </div>
                <div className="text-left hidden sm:block">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-label-md uppercase tracking-wider font-semibold">
                      {user?.username}
                    </span>
                    <span className="text-[9px] px-1 py-0.2 bg-primary/20 text-primary border border-primary/30 rounded font-label-sm">
                      {user?.roles[0]}
                    </span>
                  </div>
                  <span className="text-[9px] text-tertiary font-label-sm block">
                    ONLINE [NODE #8841]
                  </span>
                </div>
              </Link>

              <button
                id="logout-btn"
                onClick={logout}
                className="hidden sm:inline-flex px-2 py-1 text-[11px] font-label-sm text-error hover:bg-error/10 border border-error/30 hover:border-error rounded transition-colors cursor-pointer"
                title="Terminate Session"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                id="login-header-btn"
                href={NavPages.login}
                className="px-3 py-1.5 text-xs font-label-md text-primary hover:text-on-primary hover:bg-primary/20 border border-primary/40 rounded transition-all cursor-pointer"
              >
                LOGIN
              </Link>
              <Link
                id="register-header-btn"
                href={NavPages.registration}
                className="hidden sm:inline-flex px-3 py-1.5 text-xs font-label-md text-on-tertiary-fixed bg-tertiary hover:bg-tertiary-fixed border border-tertiary rounded transition-all cursor-pointer font-bold"
              >
                REGISTRATION
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
