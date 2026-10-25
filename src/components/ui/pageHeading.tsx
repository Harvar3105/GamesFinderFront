import type { ReactNode } from "react";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";

interface PageHeadingProps {
  title: ReactNode;
  aside?: ReactNode;
  /** Pushes `aside` to the right edge. */
  spread?: boolean;
}

export default function PageHeading({ title, aside, spread }: PageHeadingProps) {
  return (
    <div
      className={mergeClassNames(
        "flex flex-wrap items-baseline gap-related-md",
        spread && "justify-between",
      )}
    >
      <h1 className="typo-h1">{title}</h1>
      {aside}
    </div>
  );
}
