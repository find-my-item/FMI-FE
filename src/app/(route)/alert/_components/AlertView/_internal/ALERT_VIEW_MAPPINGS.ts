import { NotificationType, ReferenceType } from "@/api/fetch/notification";

type AlertIconBackgroundColor = {
  icon: string;
  bg: string;
};

export const ALERT_ICON_BG_BY_NOTIFICATION_TYPE: Partial<
  Record<NotificationType, AlertIconBackgroundColor>
> = {
  FAVORITE: { icon: "AlertStar", bg: "bg-system-bookmark" },
  CATEGORY: { icon: "AlertStar", bg: "bg-system-bookmark" },
};

export const DEFAULT_ALERT_ICON_BG: AlertIconBackgroundColor = {
  icon: "AlertItem",
  bg: "bg-fg-accent-foundItem",
};

export const ALERT_ICON_BG_BY_REFERENCE_TYPE: Partial<
  Record<
    ReferenceType,
    AlertIconBackgroundColor | ((type: NotificationType) => AlertIconBackgroundColor)
  >
> = {
  POST: DEFAULT_ALERT_ICON_BG,
  COMMENT: { icon: "AlertNewComment", bg: "bg-fg-neutral-strong-default" },
  CHAT: (type) => {
    const icon = type === "CHAT_REMINDER" ? "AlertUnreadChat" : "AlertNewChat";
    return { icon, bg: "bg-fg-brand-normal-default" };
  },
  INQUIRY: { icon: "AlertInquiry", bg: "bg-fg-neutral-strong-default" },
  NOTICE: { icon: "AlertNotice", bg: "bg-system-announcement" },
  REPORT: { icon: "AlertReportResult", bg: "bg-system-report" },
};
