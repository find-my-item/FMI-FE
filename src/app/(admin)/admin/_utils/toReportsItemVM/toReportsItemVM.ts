import { AdminGuestInquiryItem, AdminReportItem } from "@/api/fetch/admin";
import { AdminReportsItemData } from "../../_types";
import {
  ProcessStatusBadgeConfig,
  ReplyStatusBadgeConfig,
} from "../AdminStatusBadgeConfig/AdminStatusBadgeConfig";

export const toReportItemVM = (item: AdminReportItem): AdminReportsItemData => {
  return {
    href: `/admin/reports/report/${item.id}`,
    title: item.title,
    content: item.content,
    nickname: item.writerNickname,
    createdAt: item.createdAt,

    processStatus: ProcessStatusBadgeConfig[item.status],
    answerStatus: ReplyStatusBadgeConfig.UNANSWERED, // TODO(지권): 백엔드 API 누락
  };
};

export const toInquiryItemVM = (item: AdminReportItem): AdminReportsItemData => {
  return {
    href: `/admin/reports/inquiry/${item.id}`,
    title: item.title,
    content: item.content,
    nickname: item.writerNickname,
    createdAt: item.createdAt,

    processStatus: ProcessStatusBadgeConfig[item.status],
    answerStatus: ReplyStatusBadgeConfig.ANSWERED, // TODO(지권): 백엔드 API 누락
  };
};

export const toGuestInquiryItemVM = (item: AdminGuestInquiryItem): AdminReportsItemData => {
  return {
    href: `/admin/guest-inquiries/${item.inquiryId}`,
    title: item.title,
    content: item.content,
    nickname: item.userEmail,
    createdAt: item.createdAt,

    processStatus: ProcessStatusBadgeConfig[item.status],
    answerStatus: ReplyStatusBadgeConfig.UNANSWERED, // TODO(지권): 백엔드 API 누락
  };
};
