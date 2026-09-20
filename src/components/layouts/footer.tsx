"use client";

import AnimationsSwitcher from "../providers/animations/animationsSwitcher";
import CRTSwitcher from "../providers/crt/crtSwitcher";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-surface-container-highest bg-surface-container-lowest/80 text-on-surface-variant text-xs py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: System Copyright & Identity */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span className="font-label-sm tracking-wider text-on-surface">
              SYSTEM_STATUS: [ONLINE 99.98%]
            </span>
          </div>
          <span className="hidden sm:inline text-outline-variant">|</span>
          <span className="font-code text-[11px]">© 2026 GAMES FINDER // PRICE_TRACKER v2.0</span>
        </div>

        {/* Center: Live Stores Monitored */}
        <div className="flex items-center gap-2 font-label-sm text-[11px] text-on-surface-variant">
          <span className="text-secondary font-semibold">STREAMS:</span>
          <span className="px-1.5 py-0.5 bg-surface-container border border-surface-container-high rounded text-on-surface">
            STEAM
          </span>
          <span className="px-1.5 py-0.5 bg-surface-container border border-surface-container-high rounded text-on-surface">
            INSTANT_GAMING
          </span>
          <span className="px-1.5 py-0.5 bg-surface-container border border-surface-container-high rounded text-on-surface">
            G2A
          </span>
        </div>

        {/* Right: Cyber Controls Toggles & Telemetry */}
        <div className="flex items-center gap-4">
          <AnimationsSwitcher />
          <CRTSwitcher />
          <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-label-sm text-tertiary bg-tertiary/5 px-2 py-0.5 border border-tertiary/20 rounded">
            <span>PING:</span>
            <span className="font-mono">12ms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
