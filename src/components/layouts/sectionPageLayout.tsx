import type { ReactNode } from "react";
import PageContainer from "@/components/layouts/pageContainer";
import { Chip, PageHeading } from "@/components/ui";

interface SectionPageLayoutProps {
  title: string;
  roleLabel: string;
  nav: ReactNode;
  children: ReactNode;
}

export default function SectionPageLayout({
  title,
  roleLabel,
  nav,
  children,
}: SectionPageLayoutProps) {
  return (
    <PageContainer>
      <PageHeading title={title} aside={<Chip>{roleLabel}</Chip>} />
      <div className="flex flex-wrap gap-attention-sm">
        {nav}
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-related-lg">{children}</div>
      </div>
    </PageContainer>
  );
}
