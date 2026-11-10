"use client";

import type { User } from "@/domain/entities/user";
import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextValue {
  user: User | null;
  authUser: (u: User) => void;
  isLoggedIn: () => boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export default function UserProvider({
  clientUser,
  children,
}: {
  clientUser: User | null;
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(clientUser);

  const authUser = (u: User) => {
    setUser(u);
  };

  const logout = () => {
    setUser(null);
  };

  const isLoggedIn = () => user !== null;

  return (
    <UserContext.Provider value={{ user, authUser, isLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
}
