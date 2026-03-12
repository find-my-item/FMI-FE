import { IconName } from "@/components/common/Icon/Icon";
import { ActivityType } from "@/types";

// TODO(수현): 디자인 토큰 변환
export const ACTIVITY_STYLE_CONFIG: Record<ActivityType, { bgColor: string; iconName: IconName }> =
  {
    POST: { bgColor: "text-accent-foundItem", iconName: "Post" },
    COMMENT: { bgColor: "bg-[#5D5D5D]", iconName: "Comment" },
    FAVORITE: { bgColor: "bg-system-bookmark", iconName: "EmptyStar" },
    INQUIRY: { bgColor: "bg-[#5D5D5D]", iconName: "Inquiry" },
    REPORT: { bgColor: "bg-[#5D5D5D]", iconName: "Report" },
  };
