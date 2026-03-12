import type { ReactNode } from "react";
import { NotificationType, ReferenceType } from "@/api/fetch/notification";

export const getAlertIconBackgroundColor = (
  type: NotificationType,
  referenceType: ReferenceType
) => {
  if (type === "FAVORITE" || type === "CATEGORY") {
    return { icon: "AlertStar", bg: "bg-system-bookmark" };
  }

  switch (referenceType) {
    case "POST":
      return { icon: "AlertItem", bg: "bg-fg-accent-foundItem" };
    case "COMMENT":
      return { icon: "AlertNewComment", bg: "bg-fg-neutral-strong-default" };
    case "CHAT":
      if (type === "CHAT_REMINDER") {
        return { icon: "AlertUnreadChat", bg: "bg-fg-brand-normal-default" };
      }
      return { icon: "AlertNewChat", bg: "bg-fg-brand-normal-default" };
    case "INQUIRY":
      return { icon: "AlertInquiry", bg: "bg-fg-neutral-strong-default" };
    case "NOTICE":
      return { icon: "AlertNotice", bg: "bg-system-announcement" };
    case "REPORT":
      return { icon: "AlertReportResult", bg: "bg-system-report" };
    default:
      return { icon: "AlertItem", bg: "bg-fg-accent-foundItem" };
  }
};

export const getAlertTitle = (type: NotificationType, referenceType: ReferenceType): string => {
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

export const renderTitle = (text: string): ReactNode[] => {
  const segments = text.split(/(".*?")/g);

  return segments.map((segment, index) => {
    const isQuoted = segment.startsWith('"') && segment.endsWith('"');
    const content = isQuoted ? segment.slice(1, -1) : segment;

    if (!content) {
      return <span key={index} />;
    }

    if (isQuoted) {
      return (
        <span key={index} className="text-brand-normal-default">
          {content}
        </span>
      );
    }

    return (
      <span key={index} className="text-neutral-normal-default">
        {content}
      </span>
    );
  });
};
