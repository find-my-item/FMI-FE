import { AdminInquiryItem, AdminReportItem } from "@/api/fetch/admin";
import { ReplyStatus, ReportsType } from "@/types";
import { AdminReportsItemData } from "../../_types";
import { StatusBadgeConfig } from "./StatusBadgeConfig";

const getReportTitle = (item: AdminReportItem): string => {
  switch (item.targetType) {
    case "POST":
      return "게시글 신고";
    case "COMMENT":
      return "댓글 신고";
    case "USER":
      return "사용자 신고";
    case "CHAT":
      return "채팅 신고";
    default:
      return "신고";
  }
};

const ProcessStatusBadgeConfig: Record<ReportsType, StatusBadgeConfig> = {
  PENDING: {
    label: "접수",
    className: "text-neutral-strong-default bg-fill-neutral-strong-default",
  },
  RECEIVED: {
    label: "검토",
    className: "text-brand-normal-default bg-fill-brand-subtle-default",
  },
  ANSWERED: {
    label: "처리 완료",
    className: "text-white bg-toast",
  },
};

const ReplyStatusBadgeConfig: Record<ReplyStatus, StatusBadgeConfig> = {
  UNANSWERED: {
    label: "미답변",
    className: "text-neutral-strong-default bg-fill-neutral-strong-default",
  },
  ANSWERED: {
    label: "답변 완료",
    className: "text-white bg-toast",
  },
};

export const toReportItemVM = (item: AdminReportItem): AdminReportsItemData => {
  return {
    href: `/admin/reports/${item.reportId}`,
    title: getReportTitle(item),
    content: item.reason,
    nickname: item.reporterNickname,
    createdAt: item.createdAt,

    processStatus: ProcessStatusBadgeConfig[item.status],
    answerStatus: ReplyStatusBadgeConfig.UNANSWERED, // TODO(지권): 백엔드 API 누락
  };
};

export const toInquiryItemVM = (item: AdminInquiryItem): AdminReportsItemData => {
  return {
    href: `/admin/inquiries/${item.inquiryId}`,
    title: item.title,
    content: "",
    nickname: item.userNickname,
    createdAt: item.createdAt,

    processStatus: ProcessStatusBadgeConfig[item.status],

    answerStatus: ReplyStatusBadgeConfig.ANSWERED, // TODO(지권): 백엔드 API 누락
  };
};
