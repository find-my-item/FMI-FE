import { NotificationLabelType, NotificationType } from "../_types/NotificationType";

export const NOTIFICATION_CONFIG: { label: NotificationLabelType; value: NotificationType }[] = [
  { label: "카테고리 키워드", value: "categoryEnabled" },
  { label: "카테고리 키워드 선택", value: "enabledCategories" },
  { label: "채팅", value: "chatEnabled" },
  { label: "즐겨찾기", value: "favoriteEnabled" },
  { label: "댓글", value: "commentEnabled" },
  { label: "1:1 문의", value: "inquiryReplyEnabled" },
  { label: "신고", value: "reportResultEnabled" },
  { label: "공지사항", value: "noticeEnabled" },
];

export const NOTIFICATION = {
  commentEnabled: { label: "댓글" },
  chatEnabled: { label: "채팅" },
  inquiryReplyEnabled: { label: "1:1 문의" },
  reportResultEnabled: { label: "신고" },
  favoriteEnabled: { label: "즐겨찾기" },
  noticeEnabled: { label: "공지사항" },
  categoryEnabled: { label: "카테고리 키워드" },
  enabledCategories: { label: "카테고리 키워드 선택" },
  marketingConsent: { label: "마케팅 수신 동의" },
};

// "browserNotificationEnabled": {label: "알림 설정"},
// marketingConsent: { label: "마케팅 수신 동의", type: "toggle" },
// export const NOTIFICATION_CONFIG = {
//   categoryEnabled: { label: "카테고리 키워드", type: "toggle" },
//   enabledCategories: { label: "카테고리 키워드 선택", type: "button" },
//   chatEnabled: { label: "채팅", type: "toggle" },
//   commentEnabled: { label: "댓글", type: "toggle" },
//   favoriteEnabled: { label: "즐겨찾기", type: "toggle" },
//   inquiryReplyEnabled: { label: "1:1 문의", type: "toggle" },
//   reportResultEnabled: { label: "신고", type: "toggle" },
//   noticeEnabled: { label: "공지사항", type: "toggle" },
// } as const;
