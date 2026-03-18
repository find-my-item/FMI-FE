import { IconName } from "@/components/common/Icon/Icon";
import { ActivityType } from "@/types";

export const ACTIVITY_STYLE_CONFIG: Record<ActivityType, { bgColor: string; iconName: IconName }> =
  {
    POST: { bgColor: "bg-notificationBlue", iconName: "Post" },
    COMMENT: { bgColor: "bg-notificationGrey", iconName: "Comment" },
    FAVORITE: { bgColor: "bg-notificationYellow", iconName: "EmptyStar" },
    INQUIRY: { bgColor: "bg-notificationGrey", iconName: "Inquiry" },
    REPORT: { bgColor: "bg-notificationGrey", iconName: "Report" },
  };
