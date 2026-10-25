import type { ReactNode } from "react";

interface SectionHeadingProps {
  id: string;
  title: ReactNode;
  aside?: ReactNode;
}

export default function SectionHeading({ id, title, aside }: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-related-md">
      <h2 id={id} className="typo-h2">
        {title}
      </h2>
      {aside}
    </div>
  );
}
