import type { KeyboardEvent, MouseEvent } from "react";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";
import Button, { type ButtonVariant } from "./button";
import Icon, { type IconName } from "./icon";

export type BannerType = "notice" | "error" | "announcement";

export interface BannerAction {
  label: string;
  /** Pressing an action does not close the banner; call dismiss to close it. */
  onClick: (dismiss: () => void) => void;
  variant?: ButtonVariant;
}

const STYLES: Record<BannerType, { box: string; icon: string; iconName: IconName }> = {
  notice: { box: "border-notice bg-notice-bg", icon: "text-notice", iconName: "info" },
  error: { box: "border-error bg-error-subtle-bg", icon: "text-error", iconName: "error" },
  announcement: {
    box: "border-announcement bg-announcement-bg",
    icon: "text-announcement",
    iconName: "check_circle",
  },
};

interface BannerProps {
  type: BannerType;
  text: string;
  actions?: BannerAction[];
  onDismiss: () => void;
  className?: string;
}

// Clicking the banner itself closes it; clicks on its buttons do not.
export default function Banner({ type, text, actions, onDismiss, className }: BannerProps) {
  const style = STYLES[type];

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
      e.preventDefault();
      onDismiss();
    }
  };

  const stopAndRun = (action: BannerAction) => (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    action.onClick(onDismiss);
  };

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      data-theme="light"
      tabIndex={0}
      title="Click to dismiss"
      onClick={onDismiss}
      onKeyDown={handleKeyDown}
      className={mergeClassNames(
        "flex cursor-pointer flex-wrap items-center gap-related-md rounded-sm border px-related-lg py-related-md text-text shadow-container",
        style.box,
        className,
      )}
    >
      <Icon name={style.iconName} className={style.icon} />
      <p className="min-w-0 flex-1">{text}</p>
      {actions && actions.length > 0 && (
        <div className="flex flex-wrap gap-related-sm">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant={action.variant ?? "secondary"}
              size="compact"
              onClick={stopAndRun(action)}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
