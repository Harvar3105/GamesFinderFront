"use client";

import { useToken } from "./TokenProvider";
import { useUser } from "./UserProvider";
import { useEffect } from "react";

export function AuthInitializer() {
  const { jwt, updateJwt } = useToken();
  const { setUser } = useUser();

  useEffect(() => {
    const refreshAccessToken = async () => {
      console.log(jwt);
      if (jwt) return;

      try {
        const response = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          updateJwt(data.accessToken);
          if (data.user) {
            setUser(data.user);
          }
        } else {
          updateJwt(null);
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to refresh token:", error);
        updateJwt(null);
        setUser(null);
      }
    };

    refreshAccessToken();
  }, []);

  return null;
}
