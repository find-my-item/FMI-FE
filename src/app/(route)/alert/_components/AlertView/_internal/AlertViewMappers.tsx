import type { ReactNode } from "react";
import { NotificationType, ReferenceType } from "@/api/fetch/notification";
import { getNotificationDisplayTitle } from "@/api/fetch/notification/utils/getNotificationDisplayTitle";
import {
  ALERT_ICON_BG_BY_NOTIFICATION_TYPE,
  ALERT_ICON_BG_BY_REFERENCE_TYPE,
  DEFAULT_ALERT_ICON_BG,
} from "./ALERT_VIEW_MAPPINGS";

export const getAlertIconBackgroundColor = (
  type: NotificationType,
  referenceType: ReferenceType
) => {
  const byType = ALERT_ICON_BG_BY_NOTIFICATION_TYPE[type];
  if (byType) return byType;

  const mapper = ALERT_ICON_BG_BY_REFERENCE_TYPE[referenceType];
  if (!mapper) return DEFAULT_ALERT_ICON_BG;

  return typeof mapper === "function" ? mapper(type) : mapper;
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
