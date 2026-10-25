"use client";

import { isAdmin } from "@/components/helpers/userRoles";
import SectionPageLayout from "@/components/layouts/sectionPageLayout";
import { Avatar, Panel } from "@/components/ui";
import PlaceholderSection from "@/components/widgets/placeholderSection";
import RequireAccess from "@/components/widgets/requireAccess";
import SectionNav, { type SectionNavItem } from "@/components/widgets/sectionNav";

// FIX: Account sections are not defined yet. Replace the placeholders with real sections.
const SECTIONS: SectionNavItem[] = [
  { label: "Profile", href: "#", active: true },
  { label: "[Section]", href: "#" },
  { label: "[Section]", href: "#" },
];

export default function AccountPage() {
  return (
    <RequireAccess>
      {(user) => {
        const role = isAdmin(user) ? "Administrator" : "User";

        return (
          <SectionPageLayout
            title="Account"
            roleLabel={`Role: ${role.toLowerCase()}`}
            nav={<SectionNav user={user} label="Account sections" items={SECTIONS} />}
          >
            <Panel
              as="section"
              padding="attention"
              aria-labelledby="profile-title"
              className="flex flex-col gap-attention-sm"
            >
              <div className="flex flex-wrap items-center gap-related-lg">
                <Avatar user={user} size="lg" />
                <div className="flex flex-col gap-related-xs">
                  <h2 id="profile-title" className="typo-h2">
                    {user.username}
                  </h2>
                  <span>{user.email}</span>
                </div>
              </div>
              <dl className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-related-lg">
                <div className="flex flex-col gap-related-xs">
                  <dt className="typo-small">Username</dt>
                  <dd>{user.username}</dd>
                </div>
                <div className="flex flex-col gap-related-xs">
                  <dt className="typo-small">Email</dt>
                  <dd>{user.email}</dd>
                </div>
                <div className="flex flex-col gap-related-xs">
                  <dt className="typo-small">Role</dt>
                  <dd>{role}</dd>
                </div>
              </dl>
            </Panel>

            <PlaceholderSection />
          </SectionPageLayout>
        );
      }}
    </RequireAccess>
  );
}
