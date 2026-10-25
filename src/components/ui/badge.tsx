import type { HTMLAttributes } from "react";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";

export default function Badge({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={mergeClassNames(
        "inline-flex items-center rounded-sm bg-primary px-related-sm py-related-xs text-text typo-badge",
        className,
      )}
      {...rest}
    />
  );
}
