"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export interface AnimationsContextValue {
  areTurnedOn: boolean;
  toggleAnimations: () => void;
}

const AnimationsContext = createContext<AnimationsContextValue | undefined>(undefined);

export default function AnimationsProvider({
  initialState,
  children,
}: {
  initialState: boolean;
  children: ReactNode;
}) {
  const [areTurnedOn, setAnimationsState] = useState<boolean>(initialState);

  const toggleAnimations = () => {
    setAnimationsState(!areTurnedOn);
    document.cookie = `animationsAreOn=${areTurnedOn}; path=/; max-age=31536000`;
  };

  return (
    <AnimationsContext.Provider value={{ areTurnedOn, toggleAnimations }}>
      {children}
    </AnimationsContext.Provider>
  );
}

export function useAnimations() {
  const context = useContext(AnimationsContext);
  if (!context) throw new Error("useAnimations must be used inside AnimationsProvider");
  return context;
}
