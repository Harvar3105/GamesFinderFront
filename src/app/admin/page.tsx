"use client";

import SectionPageLayout from "@/components/layouts/sectionPageLayout";
import ScrapingTasks from "@/components/widgets/admin/scrapingTasks";
import PlaceholderSection from "@/components/widgets/placeholderSection";
import RequireAccess from "@/components/widgets/requireAccess";
import SectionNav, { type SectionNavItem } from "@/components/widgets/sectionNav";
import type { ScrapingTask } from "@/domain/entities/scrapingTask";

// FIXME: [Stage6] Sections: scraping (Steam, InstantGaming), users (roles via Identity manage/*, profile
// picture moderation).
const SECTIONS: SectionNavItem[] = [
  { label: "Overview", href: "#" },
  { label: "Scraping tasks", href: "#", active: true },
  { label: "Sources", href: "#" },
  { label: "Users", href: "#" },
];

// FIXME: [Stage6] Sources are Steam and InstantGaming, the only scraping workers.
// TODO: [Stage6] The backend has no endpoint to list scraping tasks.
const SOURCES: string[] = [];
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
          <ScrapingTasks sources={SOURCES} tasks={TASKS} />
          <PlaceholderSection />
        </SectionPageLayout>
      )}
    </RequireAccess>
  );
}
