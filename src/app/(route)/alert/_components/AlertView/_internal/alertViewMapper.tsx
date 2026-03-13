import type { ReactNode } from "react";
import { NotificationType, ReferenceType } from "@/api/fetch/notification";
import { getNotificationDisplayTitle } from "@/api/fetch/notification/utils/getNotificationDisplayTitle";

export const getAlertIconBackgroundColor = (
  type: NotificationType,
  referenceType: ReferenceType
) => {
  if (type === "FAVORITE" || type === "CATEGORY") {
    return { icon: "AlertStar", bg: "bg-system-bookmark" };
  }

  switch (referenceType) {
    case "POST":
      return { icon: "AlertItem", bg: "bg-fg-accent-foundItem" };
    case "COMMENT":
      return { icon: "AlertNewComment", bg: "bg-fg-neutral-strong-default" };
    case "CHAT":
      if (type === "CHAT_REMINDER") {
        return { icon: "AlertUnreadChat", bg: "bg-fg-brand-normal-default" };
      }
      return { icon: "AlertNewChat", bg: "bg-fg-brand-normal-default" };
    case "INQUIRY":
      return { icon: "AlertInquiry", bg: "bg-fg-neutral-strong-default" };
    case "NOTICE":
      return { icon: "AlertNotice", bg: "bg-system-announcement" };
    case "REPORT":
      return { icon: "AlertReportResult", bg: "bg-system-report" };
    default:
      return { icon: "AlertItem", bg: "bg-fg-accent-foundItem" };
  }
};

export const getAlertTitle = (type: NotificationType, referenceType: ReferenceType): string =>
  getNotificationDisplayTitle(type, referenceType);

export const renderTitle = (text: string): ReactNode[] => {
  const segments = text.split(/(".*?")/g);

  return segments.map((segment, index) => {
    const isQuoted = segment.startsWith('"') && segment.endsWith('"');
    const content = isQuoted ? segment.slice(1, -1) : segment;

    if (!content) {
      return <span key={index} />;
    }

    if (isQuoted) {
      return (
        <span key={index} className="text-brand-normal-default">
          {content}
        </span>
      );
    }

    return (
      <span key={index} className="text-neutral-normal-default">
        {content}
      </span>
    );
  });
};
