import Image from "next/image";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";

interface ThumbProps {
  src?: string | null;
  alt: string;
  placeholder?: string;
  className?: string;
  sizes?: string;
}

export default function Thumb({
  src,
  alt,
  placeholder = "Image",
  className,
  sizes = "100vw",
}: ThumbProps) {
  return (
    <div
      className={mergeClassNames(
        "relative flex items-center justify-center overflow-hidden rounded-sm bg-component text-center typo-caption",
        className,
      )}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        placeholder
      )}
    </div>
  );
}
