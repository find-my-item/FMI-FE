// TODO(수현): 디자인 토큰 변환
export const ACTIVITY_STYLE_CONFIG = {
  POST: { bgColor: "bg-[#4F95FF]", iconName: "Post" },
  COMMENT: { bgColor: "bg-[#5D5D5D]", iconName: "Comment" },
  FAVORITE: { bgColor: "bg-system-bookmark", iconName: "EmptyStar" },
  INQUIRY: { bgColor: "bg-[#5D5D5D]", iconName: "Inquiry" },
  INQUIRY_REPLY: { bgColor: "bg-[#0AA874]", iconName: "Inquiry" },
  REPORT: { bgColor: "bg-[#5D5D5D]", iconName: "Report" },
  REPORT_COMPLETE: { bgColor: "bg-[#0AA874]", iconName: "Report" },
  ALERT_SETTING: { bgColor: "bg-[#5D5D5D]", iconName: "Alert" },
} as const;
