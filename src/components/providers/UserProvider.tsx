"use client";

import { User } from "domain/entities/User";
import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextValue {
  user: User | null;
  setUser: (u: User | null) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export default function ClientProvider({
  serverUser,
  children,
}: {
  serverUser: User | null;
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(serverUser);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside UserProvider");
  return context;
}
