import { IconName } from "@/components/common/Icon/Icon";
import { ActivityType } from "../_types/ActivityType";

// TODO(수현): 디자인 토큰 변환
export const ACTIVITY_STYLE_CONFIG: Record<ActivityType, { bgColor: string; iconName: IconName }> =
  {
    POST: { bgColor: "bg-[#4F95FF]", iconName: "Post" },
    COMMENT: { bgColor: "bg-[#5D5D5D]", iconName: "Comment" },
    FAVORITE: { bgColor: "bg-system-bookmark", iconName: "EmptyStar" },
    INQUIRY: { bgColor: "bg-[#5D5D5D]", iconName: "Inquiry" },
    REPORT: { bgColor: "bg-[#5D5D5D]", iconName: "Report" },
    // TODO(수현): 디자인이 없음
    AUTHENTICATION: { bgColor: "bg-[#5D5D5D]", iconName: "Alert" },
  };
