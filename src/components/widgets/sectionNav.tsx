import { Avatar, ButtonLink, Panel } from "@/components/ui";
import type { UserDTO } from "@/domain/entities/user";

export interface SectionNavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface SectionNavProps {
  user: UserDTO;
  label: string;
  items: SectionNavItem[];
}

/** Section menu of the account and administration pages: avatar and nickname on top, then the sections. */
export default function SectionNav({ user, label, items }: SectionNavProps) {
  return (
    <Panel
      as="nav"
      aria-label={label}
      padding="tight"
      className="flex flex-[1_1_240px] flex-col gap-related-xs self-start"
    >
      <div className="mb-related-xs flex items-center gap-related-md border-b border-component p-related-sm">
        <Avatar user={user} size="md" alt={`${user.username} avatar`} />
        <span className="min-w-0 truncate text-lg/[1.3] font-semibold">{user.username}</span>
      </div>
      {items.map((item) => (
        <ButtonLink
          key={item.label}
          href={item.href}
          variant={item.active ? "primary" : "ghost"}
          justify="start"
          className="w-full"
          aria-current={item.active ? "page" : undefined}
        >
          {item.label}
        </ButtonLink>
      ))}
    </Panel>
  );
}
