import { ActivityType } from "../_types/ActivityType";

export const ACTIVITY_DEFAULT_LABEL = "유형";
export const ACTIVITY_LABEL_MAP: Record<ActivityType, string> = {
  POST: "게시글",
  COMMENT: "댓글",
  AUTHENTICATION: "인증",
  FAVORITE: "즐겨찾기",
  INQUIRY: "문의",
  REPORT: "신고",
};
