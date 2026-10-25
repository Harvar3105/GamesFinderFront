import type { ReactNode, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  highlightHover?: boolean;
  minWidth?: number;
  children: ReactNode;
}

export default function Table({
  highlightHover,
  minWidth = 960,
  className,
  style,
  children,
  ...rest
}: TableProps) {
  return (
    <div className="overflow-x-auto" data-scroll-box>
      <table
        className={mergeClassNames(
          "w-full border-collapse",
          highlightHover &&
            "[&_tbody_td]:transition-colors [&_tbody_td]:duration-150 [&_tbody_tr:hover_td]:bg-row-hover",
          className,
        )}
        style={{ minWidth, ...style }}
        {...rest}
      >
        {children}
      </table>
    </div>
  );
}

interface TableHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "right";
}

export function TableHeader({
  align = "left",
  className,
  scope = "col",
  ...rest
}: TableHeaderProps) {
  return (
    <th
      scope={scope}
      className={mergeClassNames(
        "whitespace-nowrap bg-component p-related-md typo-label",
        align === "right" ? "text-right" : "text-left",
        "first:rounded-tl-sm last:rounded-tr-sm",
        className,
      )}
      {...rest}
    />
  );
}

export function TableCell({ className, ...rest }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={mergeClassNames("border-b border-component p-related-md align-middle", className)}
      {...rest}
    />
  );
}
