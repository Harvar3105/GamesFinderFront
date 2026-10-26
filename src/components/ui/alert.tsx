import type { ReactNode } from "react";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";
import Icon from "./icon";

interface AlertProps {
  title: ReactNode;
  children?: ReactNode;
  code?: string | number;
  className?: string;
}

export default function Alert({ title, children, code, className }: AlertProps) {
  return (
    <div
      role="alert"
      data-theme="light"
      className={mergeClassNames(
        "flex items-start gap-related-md rounded-sm border border-error bg-error-bg px-related-lg py-related-md text-text",
        className,
      )}
    >
      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-container">
        <Icon name="error" className="text-error" />
      </span>
      <div className="flex min-w-0 flex-col gap-related-xs">
        <strong className="font-semibold">{title}</strong>
        {children && <p>{children}</p>}
        {code !== undefined && <span className="font-code text-xs">Error code: {code}</span>}
      </div>
    </div>
  );
}
