"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { Banner, type BannerAction, type BannerType } from "@/components/ui";

export interface NotificationOptions {
  type: BannerType;
  text: string;
  actions?: BannerAction[];
  /** How long the banner stays, in ms. Without it the banner stays until the user closes it. */
  durationMs?: number;
}

interface Notification extends NotificationOptions {
  id: number;
}

interface NotificationContextValue {
  /** Shows a banner and returns its id for dismiss. */
  notify: (options: NotificationOptions) => number;
  dismiss: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

let nextNotificationId = 1;

export default function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const dismiss = useCallback((id: number) => {
    setNotifications((current) => current.filter((notification) => notification.id !== id));
  }, []);

  const notify = useCallback((options: NotificationOptions) => {
    const id = nextNotificationId++;
    setNotifications((current) => [...current, { ...options, id }]);
    return id;
  }, []);

  return (
    <NotificationContext.Provider value={{ notify, dismiss }}>
      {children}
      {notifications.length > 0 && (
        <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col items-center gap-related-sm px-edge-x pt-related-lg">
          {notifications.map((notification) => (
            <NotificationBanner
              key={notification.id}
              notification={notification}
              onDismiss={() => dismiss(notification.id)}
            />
          ))}
        </div>
      )}
    </NotificationContext.Provider>
  );
}

function NotificationBanner({
  notification,
  onDismiss,
}: {
  notification: Notification;
  onDismiss: () => void;
}) {
  const { durationMs } = notification;

  useEffect(() => {
    if (durationMs === undefined) return;
    const timer = setTimeout(onDismiss, durationMs);
    return () => clearTimeout(timer);
    // onDismiss changes on every render of the provider; the timer must start only once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationMs]);

  return (
    <Banner
      type={notification.type}
      text={notification.text}
      actions={notification.actions}
      onDismiss={onDismiss}
      className="pointer-events-auto w-full max-w-[560px]"
    />
  );
}

export function useNotifications(): NotificationContextValue {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used inside NotificationProvider");
  return context;
}
