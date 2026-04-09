"use client";

import { useToken } from "@/components/providers/TokenProvider";
import { useUser } from "@/components/providers/UserProvider";
import { useEffect, useRef } from "react";

export function AuthInitializer() {
  const { jwt, updateJwt } = useToken();
  const { user, setUser } = useUser();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;

    const initAuth = async () => {
      if (jwt && user) {
        hasInitialized.current = true;
        return;
      }

      try {
        const body = jwt
          ? JSON.stringify({ accessToken: jwt })
          : JSON.stringify({ useRefresh: true });
        const response = await fetch("/api/auth/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          updateJwt(data.accessToken);
          hasInitialized.current = true;
        } else {
          updateJwt(null);
          setUser(null);
          hasInitialized.current = true;
        }
      } catch (error) {
        console.error("Failed to refresh token:", error);
        updateJwt(null);
        setUser(null);
        hasInitialized.current = true;
      }
    };

    initAuth();
  });

  return null;
}
