import { AdminInquiryItem, AdminReportItem } from "@/api/fetch/admin";
import { AdminReportsItemData } from "../../_types";
import {
  ProcessStatusBadgeConfig,
  ReplyStatusBadgeConfig,
} from "../AdminStatusBadgeConfig/AdminStatusBadgeConfig";

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

export const toReportItemVM = (item: AdminReportItem): AdminReportsItemData => {
  return {
    href: `/admin/reports/report/${item.reportId}`,
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
    href: `/admin/inquiries/inquiry/${item.inquiryId}`,
    title: item.title,
    content: "",
    nickname: item.userNickname,
    createdAt: item.createdAt,

    processStatus: ProcessStatusBadgeConfig[item.status],

    answerStatus: ReplyStatusBadgeConfig.ANSWERED, // TODO(지권): 백엔드 API 누락
  };
};
