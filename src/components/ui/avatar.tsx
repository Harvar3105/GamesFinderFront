import Image from "next/image";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";
import { DEFAULT_AVATAR } from "@/config/assets";
import { BffRoutes } from "@/config/bffRoutes";

type AvatarSize = "sm" | "md" | "lg";

const sizes: Record<AvatarSize, { px: number; className: string }> = {
  sm: { px: 32, className: "size-8" },
  md: { px: 56, className: "size-14" },
  lg: { px: 72, className: "size-18" },
};

interface AvatarProps {
  /** The picture is loaded by the user id; the BFF serves DEFAULT_AVATAR when the user has no picture. */
  userId?: string | null;
  /** Leave empty when the user's name is shown next to the avatar. */
  alt?: string;
  size?: AvatarSize;
  className?: string;
}

// FIXME: [Stage5] The URL does not change after the picture is uploaded or deleted, so open avatars keep the
// old one until a reload. Add a profile picture provider with a version per user id (the upload's contentHash)
// and a hook to bump it after upload / delete; the avatar appends the version to the URL (?v=), which
// requests the new picture past the browser cache.
export default function Avatar({ userId, alt = "", size = "sm", className }: AvatarProps) {
  const { px, className: sizeClass } = sizes[size];

  return (
    <span
      className={mergeClassNames(
        "relative inline-flex shrink-0 overflow-hidden rounded-full bg-component",
        sizeClass,
        className,
      )}
    >
      <Image
        src={userId ? BffRoutes.profilePicture(userId) : DEFAULT_AVATAR}
        alt={alt}
        width={px}
        height={px}
        // The picture is revalidated by its ETag through the BFF; the optimizer would cache it under its own rules.
        unoptimized
        className="size-full object-cover"
      />
    </span>
  );
}
