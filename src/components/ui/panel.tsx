import type { HTMLAttributes } from "react";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";

type PanelPadding = "none" | "related" | "attention";

const paddings: Record<PanelPadding, string> = {
  none: "p-0 overflow-hidden",
  related: "p-related-lg",
  attention: "p-attention-sm",
};

interface PanelProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "section" | "article" | "nav" | "aside" | "form";
  padding?: PanelPadding;
}

export default function Panel({
  as: Tag = "div",
  padding = "related",
  className,
  ...rest
}: PanelProps) {
  return (
    <Tag
      className={mergeClassNames(
        "rounded-md bg-container shadow-container",
        paddings[padding],
        className,
      )}
      {...rest}
    />
  );
}
