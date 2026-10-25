"use client";

import type { ReactNode } from "react";
import { useUser } from "@/components/providers/userProvider";

export default function GuestOnly({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useUser();
  return isLoggedIn() ? null : children;
}
