"use client";

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

type PopupVariant = "blue" | "green" | "red" | "yellow";

interface PopupConfig {
  message: string;
  variant: PopupVariant;
  durationMs?: number;
}

interface PopupState extends PopupConfig {
  id: number;
}

interface PopupContextValue {
  showPopup: (config: PopupConfig) => void;
  hidePopup: () => void;
}

const popupVariants: Record<PopupVariant, string> = {
  blue: "bg-blue-600 text-white",
  green: "bg-green-600 text-white",
  red: "bg-red-600 text-white",
  yellow: "bg-yellow-400 text-gray-950",
};

const PopupContext = createContext<PopupContextValue | undefined>(undefined);

export default function PopupProvider({ children }: { children: ReactNode }) {
  const [popup, setPopup] = useState<PopupState | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPopupTimeout = () => {
    if (!timeoutRef.current) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  const hidePopup = () => {
    clearPopupTimeout();
    setPopup(null);
  };

  const showPopup = ({ message, variant, durationMs }: PopupConfig) => {
    clearPopupTimeout();

    const nextPopup: PopupState = {
      id: Date.now(),
      message,
      variant,
      durationMs,
    };

    setPopup(nextPopup);

    if (durationMs && durationMs > 0) {
      timeoutRef.current = setTimeout(() => {
        setPopup((currentPopup) => (currentPopup?.id === nextPopup.id ? null : currentPopup));
        timeoutRef.current = null;
      }, durationMs);
    }
  };

  useEffect(() => clearPopupTimeout, []);

  return (
    <PopupContext.Provider value={{ showPopup, hidePopup }}>
      {children}
      <PopupWidget popup={popup} onClose={hidePopup} />
    </PopupContext.Provider>
  );
}

function PopupWidget({ popup, onClose }: { popup: PopupState | null; onClose: () => void }) {
  if (!popup) return null;

  return (
    <button
      type="button"
      onClick={onClose}
      className="fixed top-4 left-1/2 z-[1000] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 cursor-pointer rounded-xl px-4 py-3 text-left shadow-lg transition hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      aria-label="Close notification"
    >
      <div className={`${popupVariants[popup.variant]} rounded-xl px-4 py-3`}>
        <p className="text-sm font-semibold tracking-[0.01em]">{popup.message}</p>
      </div>
    </button>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);

  if (!context) {
    throw new Error("usePopup must be used inside PopupProvider");
  }

  return context;
}

export type { PopupConfig, PopupVariant };
