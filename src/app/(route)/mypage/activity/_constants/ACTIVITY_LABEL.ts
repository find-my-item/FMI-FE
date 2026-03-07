import { ActivityType } from "@/types";

export const ACTIVITY_LABEL_MAP: Record<ActivityType, string> = {
  POST: "게시글",
  COMMENT: "댓글",
  FAVORITE: "즐겨찾기",
  INQUIRY: "문의",
  REPORT: "신고",
};
