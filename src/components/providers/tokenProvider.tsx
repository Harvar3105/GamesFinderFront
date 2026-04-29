"use client";

import React, { useContext, useState } from "react";
import { createContext } from "react";

interface TokenContextValue {
  jwt: string | null;
  updateJwt: (t: string | null) => void;
}

const TokenContext = createContext<TokenContextValue | undefined>(undefined);

export default function TokenProvider({
  children,
  initialJwt,
}: {
  children: React.ReactNode;
  initialJwt?: string | null;
}) {
  const [jwt, setJwt] = useState<string | null>(initialJwt || null);

  const updateJwt = (token: string | null) => {
    setJwt(token);
  };

  return <TokenContext.Provider value={{ jwt, updateJwt }}>{children}</TokenContext.Provider>;
}

export function useToken() {
  const context = useContext(TokenContext);
  if (!context) throw new Error("useToken must be used inside TokenProvider");
  return context;
}
