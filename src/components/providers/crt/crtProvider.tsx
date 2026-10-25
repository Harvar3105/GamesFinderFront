"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface CRTContextValue {
  isTurnedOn: boolean;
  toggleCRT: () => void;
}

const CRTContext = createContext<CRTContextValue | undefined>(undefined);

export default function CRTProvider({
  initialState,
  children,
}: {
  initialState: boolean;
  children: ReactNode;
}) {
  const [isTurnedOn, setCRTState] = useState<boolean>(initialState);
  const toggleCRT = () => {
    setCRTState(!isTurnedOn);
    document.cookie = `styleIsOn=${isTurnedOn}; path=/; max-age=31536000`;
  };

  return <CRTContext.Provider value={{ isTurnedOn, toggleCRT }}>{children}</CRTContext.Provider>;
}

export function useCRT() {
  const context = useContext(CRTContext);
  if (!context) throw new Error("useCRT must be used inside CRTProvider");
  return context;
}
