"use client";

import type { CSSProperties, MouseEvent } from "react";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";
import Thumb from "./thumb";

const ZOOM = 1.5;
const EDGE_GAP = 8;

interface ZoomThumbProps {
  src?: string | null;
  alt: string;
  placeholder?: string;
  sizes?: string;
  /** Size of the thumbnail before zoom, e.g. "w-24 aspect-video". */
  className?: string;
}

export default function ZoomThumb({ src, alt, placeholder, sizes, className }: ZoomThumbProps) {
  const fitZoom = (event: MouseEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const scrollBox = element.closest("[data-scroll-box]");
    const minLeft = Math.max(
      EDGE_GAP,
      scrollBox ? scrollBox.getBoundingClientRect().left + EDGE_GAP : EDGE_GAP,
    );
    const zoomedLeft = rect.left - (rect.width * (ZOOM - 1)) / 2;
    const shift = Math.max(0, Math.ceil(minLeft - zoomedLeft));
    element.style.setProperty("--zoom-shift", `${shift}px`);
  };

  return (
    <div
      onMouseEnter={fitZoom}
      style={{ "--zoom-shift": "0px" } as CSSProperties}
      className={mergeClassNames(
        "relative cursor-zoom-in rounded-sm transition-[translate,scale,box-shadow] duration-200 motion-reduce:transition-none",
        "hover:z-10 hover:translate-x-(--zoom-shift) hover:scale-150 hover:shadow-container",
        className,
      )}
    >
      <Thumb src={src} alt={alt} placeholder={placeholder} sizes={sizes} className="size-full" />
    </div>
  );
}
