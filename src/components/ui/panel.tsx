import type { FormHTMLAttributes, HTMLAttributes } from "react";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";

export type PanelPadding = "none" | "tight" | "related" | "attention";

const paddings: Record<PanelPadding, string> = {
  none: "p-0 overflow-hidden",
  tight: "p-related-sm",
  related: "p-related-lg",
  attention: "p-attention-sm",
};

export function panelClass(padding: PanelPadding = "related", className?: string): string {
  return mergeClassNames("rounded-md bg-container shadow-container", paddings[padding], className);
}

interface PanelProps
  extends HTMLAttributes<HTMLElement>, Pick<FormHTMLAttributes<HTMLFormElement>, "noValidate"> {
  as?: "div" | "section" | "article" | "nav" | "aside" | "form";
  padding?: PanelPadding;
}

export default function Panel({
  as: Tag = "div",
  padding = "related",
  className,
  ...rest
}: PanelProps) {
  return <Tag className={panelClass(padding, className)} {...rest} />;
}
