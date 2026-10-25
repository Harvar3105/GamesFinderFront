"use client";

import { useUser } from "@/components/providers/userProvider";
import { NavPages } from "@/domain/navPages";
import Link from "next/link";

export default function HomePage() {
  const { user } = useUser();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center">
      {/* Central Terminal Hero Card */}
      <div className="w-full max-w-4xl relative bg-surface-container-lowest border border-surface-container-highest shadow-2xl rounded-lg overflow-hidden">
        {/* Tactical Corner Brackets */}
        <div className="retro-decor absolute top-2 left-3 text-[10px] font-label-sm text-outline-variant select-none pointer-events-none">
          ◤ 01
        </div>
        <div className="retro-decor absolute top-2 right-3 text-[10px] font-label-sm text-outline-variant select-none pointer-events-none">
          ◥ 88
        </div>
        <div className="retro-decor absolute bottom-2 left-3 text-[10px] font-label-sm text-outline-variant select-none pointer-events-none">
          ◣ SEC_09
        </div>
        <div className="retro-decor absolute bottom-2 right-3 text-[10px] font-label-sm text-outline-variant select-none pointer-events-none">
          ◢ 44
        </div>

        {/* Hero Terminal Status Bar */}
        <div className="px-4 py-2.5 bg-surface-container-high/70 border-b border-surface-container-highest flex flex-col sm:flex-row items-center justify-between text-xs font-label-sm text-on-surface-variant gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span className="text-on-surface">
              [ TTY_01: MAINFRAME_ROOT // ACTIVE_SESSION #8841 ]
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-secondary font-semibold">SCRAPER_THREAD:</span>
            <span className="text-tertiary">12_CORES_RUNNING [ONLINE]</span>
          </div>
        </div>

        {/* Interactive CLI Prompt bar */}
        <div className="px-5 py-3 bg-surface-container-low border-b border-surface-container-highest font-code text-xs text-on-surface flex items-center gap-2 overflow-x-auto">
          <span className="text-tertiary">user@games-finder:~$</span>
          <span className="text-secondary">
            ./init_price_aggregator.sh --stream=wishlist --target=steam,ig,g2a
          </span>
          <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
        </div>

        {/* Hero Body Content */}
        <div className="px-6 py-10 sm:py-16 sm:px-12 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded text-xs font-label-sm text-primary mb-6">
            <svg
              className="w-4 h-4 animate-spin"
              style={{ animationDuration: "6s" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            <span>NEXT-GEN REAL-TIME TELEMETRY</span>
          </div>

          {/* Main Title */}
          <h1
            id="hero-main-title"
            className="font-bitcount text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-primary uppercase drop-shadow-[0_0_20px_rgba(221,183,255,0.3)] mb-4"
          >
            &gt;/ GAMES FINDER
          </h1>

          {/* Subtitle */}
          <h2 className="font-space text-base sm:text-xl font-semibold tracking-wider text-on-surface uppercase mb-6 max-w-2xl">
            NEXT-GEN VIDEO GAME PRICE TRACKER &amp; WISHLIST RADAR
          </h2>

          {/* Narrative text */}
          <p className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed mb-10">
            Cross-platform real-time game deal aggregator. We track Steam, Instant-Gaming, and
            digital storefronts so you never pay full price for titles in your wishlist. Instant
            historical lows, automated price triggers, and vendor telemetry.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              id="hero-browse-games-btn"
              href={NavPages.catalog}
              className="w-full sm:w-auto px-8 py-3.5 bg-primary text-on-primary-container font-label-lg font-bold text-sm tracking-wider uppercase rounded hover:bg-primary-fixed transition-all shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>[ ENTER THE ARCHIVES // BROWSE GAMES ]</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>

            {user ? (
              <Link
                id="hero-profile-btn"
                href={NavPages.account}
                className="w-full sm:w-auto px-6 py-3.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-lg font-semibold text-sm tracking-wider uppercase border border-surface-container-highest hover:border-tertiary/40 rounded transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="text-tertiary">&gt;</span>
                <span>[ OPERATOR_CABINET // RADAR ]</span>
              </Link>
            ) : (
              <Link
                id="hero-auth-btn"
                href={NavPages.login}
                className="w-full sm:w-auto px-6 py-3.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-lg font-semibold text-sm tracking-wider uppercase border border-surface-container-highest hover:border-primary/40 rounded transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="text-primary">&gt;</span>
                <span>[ AUTHENTICATE // LOGIN ]</span>
              </Link>
            )}
          </div>
        </div>

        {/* Telemetry Stats Bar at Bottom */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-surface-container-highest divide-x divide-surface-container-highest text-center bg-surface-container-high/40">
          <div className="p-3 sm:p-4">
            <span className="block text-[11px] font-label-sm text-outline">TOTAL_INDEXED</span>
            <span className="text-base sm:text-lg font-bold text-on-surface font-code">
              1,517 GAMES
            </span>
          </div>
          <div className="p-3 sm:p-4">
            <span className="block text-[11px] font-label-sm text-outline">PEAK_SAVINGS</span>
            <span className="text-base sm:text-lg font-bold text-tertiary font-code">
              -90% ALL-TIME LOW
            </span>
          </div>
          <div className="p-3 sm:p-4">
            <span className="block text-[11px] font-label-sm text-outline">FEED_CHANNELS</span>
            <span className="text-base sm:text-lg font-bold text-secondary font-code">
              STEAM + IG + G2A
            </span>
          </div>
          <div className="p-3 sm:p-4">
            <span className="block text-[11px] font-label-sm text-outline">TELEMETRY_STATUS</span>
            <span className="text-base sm:text-lg font-bold text-primary font-code">
              ACTIVE POLLING
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
