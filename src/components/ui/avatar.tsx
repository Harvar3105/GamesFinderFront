import Image from "next/image";
import type { UserDTO } from "@/domain/entities/user";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";

export const DEFAULT_AVATAR = "/pfp.jpg";

type AvatarSize = "sm" | "md" | "lg";

const sizes: Record<AvatarSize, { px: number; className: string }> = {
  sm: { px: 32, className: "size-8" },
  md: { px: 56, className: "size-14" },
  lg: { px: 72, className: "size-18" },
};

// FIXME: [Stage5] Identity serves profile pictures (GET profilePicture/{userId}, ETag). Load them through a BFF
// proxy route by user id, fall back to DEFAULT_AVATAR on 404, and drop the data: URI.
function avatarSource(user?: UserDTO | null): string {
  const content = user?.data?.pfpContent;
  const extension = user?.data?.pfpExtension?.replace(/^\./, "");

  if (!content || !extension) return DEFAULT_AVATAR;

  return `data:image/${extension};base64,${content}`;
}

interface AvatarProps {
  user?: UserDTO | null;
  /** Leave empty when the user's name is shown next to the avatar. */
  alt?: string;
  size?: AvatarSize;
  className?: string;
}

export default function Avatar({ user, alt = "", size = "sm", className }: AvatarProps) {
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
        src={avatarSource(user)}
        alt={alt}
        width={px}
        height={px}
        // The image optimizer does not process data: URIs.
        unoptimized
        className="size-full object-cover"
      />
    </span>
  );
}
