"use client";

import { UserDTO } from "@/domain/entities/user";
import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextValue {
  user: UserDTO | null;
  authUser: (u: UserDTO) => void;
  isLoggedIn: () => boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export default function UserProvider({
  clientUser,
  children,
}: {
  clientUser: UserDTO | null;
  children: ReactNode;
}) {
  // TODO: [Stage2] Short sessions expire in Redis after 30 minutes of inactivity. After a configurable
  // period (28 minutes by default) show a banner offering to extend the session; if the user declines
  // or does not answer in time, clear the user from this provider.
  const [user, setUser] = useState<UserDTO | null>(clientUser);

  const authUser = (u: UserDTO) => {
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
