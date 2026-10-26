import type { ReactNode } from "react";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";

type PageSpacing = "default" | "wide";

const spacings: Record<PageSpacing, string> = {
  default: "gap-attention-sm pt-attention-sm pb-attention-md",
  wide: "gap-attention-lg pt-attention-md pb-attention-lg",
};

interface PageContainerProps {
  spacing?: PageSpacing;
  className?: string;
  children: ReactNode;
}

export default function PageContainer({
  spacing = "default",
  className,
  children,
}: PageContainerProps) {
  return (
    <div
      className={mergeClassNames(
        "mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-edge-x",
        spacings[spacing],
        className,
      )}
    >
      {children}
    </div>
  );
}
