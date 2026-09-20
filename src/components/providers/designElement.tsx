"use client";

import { ReactNode } from "react";
import { useCRT } from "./crt/crtProvider";
import { useAnimations } from "./animations/animationsProvider";

export default function DesignElement({ children }: { children: ReactNode }) {
  const { isTurnedOn: crt } = useCRT();
  const { areTurnedOn: animations } = useAnimations();

  return (
    <>
      {crt && (
        <div
          className="fixed inset-0 pointer-events-none z-30 crt-scanlines light:opacity-10 dark:opacity-40"
          aria-hidden={true}
        />
      )}
      <div
        className={`${crt ? "crt-background" : "bg-surface"} ${animations ? "" : "disable-animations"}`}
      >
        {children}
      </div>
    </>
  );
}
