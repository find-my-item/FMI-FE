import { NotificationType, ReferenceType } from "@/api/fetch/notification";
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
