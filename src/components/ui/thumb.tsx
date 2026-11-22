import Image from "next/image";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";

export type ThumbFit = "cover" | "contain";

const fitClasses: Record<ThumbFit, string> = {
  cover: "object-cover",
  contain: "object-contain",
};

interface ThumbProps {
  src?: string | null;
  alt: string;
  placeholder?: string;
  className?: string;
  sizes?: string;
  /** `cover` fills the box and crops the image; `contain` shows it whole, letterboxed on the box background. */
  fit?: ThumbFit;
}

export default function Thumb({
  src,
  alt,
  placeholder = "Image",
  className,
  sizes = "100vw",
  fit = "cover",
}: ThumbProps) {
  return (
    <div
      className={mergeClassNames(
        "relative flex items-center justify-center overflow-hidden rounded-sm bg-component text-center typo-caption",
        className,
      )}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className={fitClasses[fit]} />
      ) : (
        placeholder
      )}
    </div>
  );
}
