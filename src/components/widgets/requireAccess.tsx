"use client";

import type { ReactNode } from "react";
import { isAdmin } from "@/components/helpers/userRoles";
import PageContainer from "@/components/layouts/pageContainer";
import { useUser } from "@/components/providers/userProvider";
import { Alert, ButtonLink, Panel } from "@/components/ui";
import { NavPages } from "@/config/navPages";
import type { UserDTO } from "@/domain/entities/user";

interface RequireAccessProps {
  asAdmin?: boolean;
  children: (user: UserDTO) => ReactNode;
}

export default function RequireAccess({ asAdmin = false, children }: RequireAccessProps) {
  const { user, isLoggedIn } = useUser();

  if (!isLoggedIn() || !user) {
    return <AccessMessage title="You are not signed in">Sign in to open this page.</AccessMessage>;
  }

  if (asAdmin && !isAdmin(user)) {
    return (
      <AccessMessage title="Access denied">
        This page is available to administrators only.
      </AccessMessage>
    );
  }

  return children(user);
}

function AccessMessage({ title, children }: { title: string; children: ReactNode }) {
  const { isLoggedIn } = useUser();

  return (
    <PageContainer className="items-center justify-center">
      <Panel padding="attention" className="flex w-full max-w-[440px] flex-col gap-attention-sm">
        <Alert title={title}>{children}</Alert>
        <ButtonLink
          href={isLoggedIn() ? NavPages.home : NavPages.login}
          variant="primary"
          className="w-full"
        >
          {isLoggedIn() ? "Go to the home page" : "Sign in"}
        </ButtonLink>
      </Panel>
    </PageContainer>
  );
}
