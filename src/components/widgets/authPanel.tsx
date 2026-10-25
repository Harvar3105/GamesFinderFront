import type { ComponentProps, ReactNode } from "react";
import { Panel } from "@/components/ui";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";

interface AuthPanelProps {
  titleId: string;
  title: string;
  description?: string;
  onSubmit?: ComponentProps<typeof Panel>["onSubmit"];
  className?: string;
  children: ReactNode;
}

export default function AuthPanel({
  titleId,
  title,
  description,
  onSubmit,
  className,
  children,
}: AuthPanelProps) {
  return (
    <Panel
      as={onSubmit ? "form" : "section"}
      padding="attention"
      aria-labelledby={titleId}
      noValidate={onSubmit ? true : undefined}
      onSubmit={onSubmit}
      className={mergeClassNames("flex w-full flex-col gap-attention-sm", className)}
    >
      <div className="flex flex-col gap-related-sm">
        <h1 id={titleId} className="typo-h1">
          {title}
        </h1>
        {description && <p>{description}</p>}
      </div>
      {children}
    </Panel>
  );
}
