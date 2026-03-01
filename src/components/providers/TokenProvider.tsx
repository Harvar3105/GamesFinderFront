"use client";

import React, { useContext, useState } from "react";
import { createContext } from "react";

interface TokenContextValue {
  jwt: string | null;
  rt: string | null;
  updateJwt: (t: string | null) => void;
  updateRt: (t: string | null) => void;
}

const TokenContext = createContext<TokenContextValue | undefined>(undefined);

export default function TokenProvider({
  children,
  initialJwt,
  initialRt,
}: {
  children: React.ReactNode;
  initialJwt?: string | null;
  initialRt?: string | null;
}) {
  const [jwt, setJwt] = useState<string | null>(initialJwt || null);
  const [rt, setRt] = useState<string | null>(initialRt || null);

  const updateJwt = (token: string | null) => {
    setJwt(token);
    if (token) {
      document.cookie = `jwt=${token}; path=/; max-age=3600`;
    } else {
      document.cookie = "jwt=; path=/; max-age=0";
    }
  };

  const updateRt = (token: string | null) => {
    setRt(token);
    if (token) {
      document.cookie = `rt=${token}; path=/; max-age=604800`;
    } else {
      document.cookie = "rt=; path=/; max-age=0";
    }
  };

  return (
    <TokenContext.Provider value={{ jwt, rt, updateJwt, updateRt }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  const context = useContext(TokenContext);
  if (!context) throw new Error("useToken must be used inside TokenProvider");
  return context;
}
