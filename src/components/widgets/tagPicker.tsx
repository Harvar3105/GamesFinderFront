"use client";

import { useId, useState } from "react";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";
import { ChipToggle, IconButton, Input } from "@/components/ui";

interface TagPickerProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  searchPlaceholder?: string;
}

export default function TagPicker({
  label,
  options,
  selected,
  onChange,
  searchPlaceholder = "Find",
}: TagPickerProps) {
  const id = useId();
  const labelId = `${id}-label`;
  const listId = `${id}-list`;

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();
  const visible = normalizedQuery
    ? options.filter((option) => option.toLowerCase().includes(normalizedQuery))
    : options;

  const toggle = (option: string) =>
    onChange(
      selected.includes(option)
        ? selected.filter((value) => value !== option)
        : [...selected, option],
    );

  return (
    <div className="flex flex-wrap items-start gap-related-sm">
      <span id={labelId} className="flex min-h-9 shrink-0 basis-16 items-center typo-label">
        {label}
      </span>
      <div className="w-[180px] shrink-0">
        <Input
          type="search"
          controlSize="sm"
          placeholder={searchPlaceholder}
          aria-label={`Search ${label.toLowerCase()}`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div
        id={listId}
        role="group"
        aria-labelledby={labelId}
        className={mergeClassNames(
          "flex min-w-0 flex-[1_1_320px] flex-wrap gap-related-xs p-0.5",
          !open && "max-h-9 overflow-hidden",
        )}
      >
        {visible.map((option) => (
          <ChipToggle
            key={option}
            selected={selected.includes(option)}
            onClick={() => toggle(option)}
          >
            {option}
          </ChipToggle>
        ))}
        {visible.length === 0 && <span className="self-center typo-small">No matches</span>}
      </div>
      <IconButton
        icon="arrow_drop_down"
        size="sm"
        label={open ? "Show fewer" : "Show all"}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        iconClassName={mergeClassNames(
          "transition-transform duration-200 motion-reduce:transition-none",
          open && "rotate-180",
        )}
      />
    </div>
  );
}
