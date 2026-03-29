export const ACTIVITY_STYLE_CONFIG = {
  POST: { bgColor: "bg-notificationBlue", iconName: "Post", logTitle: "게시글을 작성했습니다." },
  COMMENT: {
    bgColor: "bg-notificationGrey",
    iconName: "Comment",
    logTitle: "댓글을 작성했습니다.",
  },
  FAVORITE: {
    bgColor: "bg-notificationYellow",
    iconName: "EmptyStar",
    logTitle: "게시글을 즐겨찾기했습니다.",
  },
  // TODO(수현): 디자인, 백엔드 api 업데이트 확인 필요함
  INQUIRY: {
    bgColor: "bg-notificationGrey",
    iconName: "Inquiry",
    logTitle: "1:1문의를 작성했습니다.",
  },
  INQUIRY_REPLY: {
    bgColor: "bg-notificationBrand",
    iconName: "Inquiry",
    logTitle: "1:1문의 답변이 달렸습니다.",
  },
  REPORT: {
    bgColor: "bg-notificationGrey",
    iconName: "Report",
    logTitle: "신고가 접수되었습니다.",
  },
  REPORT_RESULT: {
    bgColor: "bg-notificationBrand",
    iconName: "Report",
    logTitle: "접수된 신고가 처리되었습니다.",
  },
} as const;
