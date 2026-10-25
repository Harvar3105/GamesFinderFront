"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ButtonLink, IconButton, IconLink, Select } from "@/components/ui";
import { PAGE_SIZE_OPTIONS } from "@/config/pagination";

type PageItem = number | "gap";

function pageItems(current: number, total: number): PageItem[] {
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);

  return sorted.flatMap((page, index) =>
    index > 0 && page - sorted[index - 1] > 1 ? (["gap", page] as PageItem[]) : [page],
  );
}

interface PaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
}

export default function Pagination({ page, pageSize, totalItems }: PaginationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  const hrefWith = (changes: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(changes).forEach(([key, value]) => params.set(key, value));
    return `${pathname}?${params.toString()}`;
  };
  const pageHref = (target: number) => hrefWith({ page: String(target) });

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-between gap-related-md"
    >
      <span>
        Showing {from}–{to} of {totalItems}
      </span>

      <div className="flex flex-wrap items-center gap-related-xs">
        {page > 1 ? (
          <IconLink icon="arrow_circle_left" label="Previous page" href={pageHref(page - 1)} />
        ) : (
          <IconButton icon="arrow_circle_left" label="Previous page" disabled />
        )}

        {pageItems(page, totalPages).map((item, index) =>
          item === "gap" ? (
            <span key={`gap-${index}`} aria-hidden="true" className="w-8 text-center">
              …
            </span>
          ) : (
            <ButtonLink
              key={item}
              href={pageHref(item)}
              size="compact"
              variant={item === page ? "primary" : "ghost"}
              aria-current={item === page ? "page" : undefined}
            >
              {item}
            </ButtonLink>
          ),
        )}

        {page < totalPages ? (
          <IconLink icon="arrow_circle_right" label="Next page" href={pageHref(page + 1)} />
        ) : (
          <IconButton icon="arrow_circle_right" label="Next page" disabled />
        )}
      </div>

      <div className="flex items-center gap-related-sm">
        <label htmlFor="per-page">Per page</label>
        <Select
          id="per-page"
          fullWidth={false}
          value={pageSize}
          onChange={(e) => router.push(hrefWith({ perPage: e.target.value, page: "1" }))}
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Select>
      </div>
    </nav>
  );
}
