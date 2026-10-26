"use client";

import SectionPageLayout from "@/components/layouts/sectionPageLayout";
import ScrapingTasks from "@/components/widgets/admin/scrapingTasks";
import PlaceholderSection from "@/components/widgets/placeholderSection";
import RequireAccess from "@/components/widgets/requireAccess";
import SectionNav, { type SectionNavItem } from "@/components/widgets/sectionNav";
import { EVendor } from "@/domain/entities/enums/EVendor";
import type { ScrapingTask } from "@/domain/entities/scrapingTask";

// FIX: Section links are placeholders until the administration sections get their own pages.
const SECTIONS: SectionNavItem[] = [
  { label: "Overview", href: "#" },
  { label: "Scraping tasks", href: "#", active: true },
  { label: "Sources", href: "#" },
  { label: "Users", href: "#" },
];

// FIXME: Placeholder tasks. Replace with data from the BFF once the endpoints exist.
const TASKS: ScrapingTask[] = [1, 2, 3, 4].map((n) => ({
  id: `[task-id-${n}]`,
  source: "[Source]",
  status: "[status]",
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export default function AdminPage() {
  return (
    <RequireAccess asAdmin>
      {(user) => (
        <SectionPageLayout
          title="Administration"
          roleLabel="Role: administrator"
          nav={<SectionNav user={user} label="Administration sections" items={SECTIONS} />}
        >
          <ScrapingTasks sources={Object.values(EVendor)} tasks={TASKS} />
          <PlaceholderSection />
        </SectionPageLayout>
      )}
    </RequireAccess>
  );
}
