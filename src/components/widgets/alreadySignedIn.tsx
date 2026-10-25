"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Alert, ButtonLink } from "@/components/ui";
import { NavPages } from "@/config/navPages";
import AuthPanel from "./authPanel";

interface AlreadySignedInProps {
  title: string;
}

/**
 * Replaces the sign-in / sign-up form for a signed-in user and redirects home.
 * The message stays visible in case the browser blocks the redirect.
 */
export default function AlreadySignedIn({ title }: AlreadySignedInProps) {
  const router = useRouter();

  useEffect(() => {
    router.replace(NavPages.home);
  }, [router]);

  return (
    <AuthPanel titleId="already-signed-in-title" title={title} className="max-w-[440px]">
      <Alert title="You are already signed in">
        You are being redirected to the home page. If nothing happens, use the button below.
      </Alert>
      <ButtonLink href={NavPages.home} variant="primary" className="w-full">
        Go to the home page
      </ButtonLink>
    </AuthPanel>
  );
}
