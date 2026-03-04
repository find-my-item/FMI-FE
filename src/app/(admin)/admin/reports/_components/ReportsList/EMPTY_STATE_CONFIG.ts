export const EMPTY_STATE_CONFIG = {
  report: {
    icon: { iconName: "NoReports", iconSize: 70 },
    title: "신고 내역이 없어요",
    description: "아직 신고 내역이 없습니다.\n신고가 접수되면 이곳에 표기됩니다.",
  },
  inquiry: {
    icon: { iconName: "NoInquiries", iconSize: 70 },
    title: "문의 내역이 없어요",
    description: "아직 문의 내역이 없습니다.\n문의가 접수되면 이곳에 표기됩니다.",
  },
} as const;
