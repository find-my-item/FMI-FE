import { NotificationType, ReferenceType } from "../types/notificationSSETypes";

export const getNotificationDisplayTitle = (
  type: NotificationType,
  referenceType: ReferenceType
): string => {
  if (type === "FAVORITE" || type === "CATEGORY") {
    return '"즐겨찾기한 게시글의 상태"가 변경되었어요';
  }

  switch (referenceType) {
    case "POST":
      return "새 게시글이 등록되었어요";
    case "COMMENT":
      return '"새로운 댓글"이 달렸어요';
    case "CHAT":
      return type === "CHAT_REMINDER"
        ? '"확인되지 않은 채팅"이 있어요'
        : '"새로운 채팅"이 도착했어요';
    case "INQUIRY":
      return '"문의하신 내용에 답변"이 등록되었어요';
    case "NOTICE":
      return '"새로운 공지사항이 등록"되었어요';
    case "REPORT":
      return '"신고에 대한 답변"이 등록되었어요';
    default:
      return "알림이 도착했어요";
  }
};
