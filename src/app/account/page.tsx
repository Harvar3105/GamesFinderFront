"use client";

import { isAdmin } from "@/components/helpers/userRoles";
import SectionPageLayout from "@/components/layouts/sectionPageLayout";
import { Avatar, Panel } from "@/components/ui";
import PlaceholderSection from "@/components/widgets/placeholderSection";
import RequireAccess from "@/components/widgets/requireAccess";
import SectionNav, { type SectionNavItem } from "@/components/widgets/sectionNav";

// FIXME: [Stage5] Sections from the backend UserData and Identity: profile picture, preferences (currency,
// region), hidden games, Steam account (unlink), delete data.
// TODO: [Stage5] Linking a Steam account (Steam OpenID) and wishlist sync are not implemented on the backend yet.
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
