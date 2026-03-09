import { AdminGuestInquiryItem, AdminInquiriesItem, AdminReportItem } from "@/api/fetch/admin";
import { AdminReportsItemData } from "../../_types";
import {
  ProcessStatusBadgeConfig,
  ReplyStatusBadgeConfig,
} from "../AdminStatusBadgeConfig/AdminStatusBadgeConfig";

export const toReportItemVM = (item: AdminReportItem): AdminReportsItemData => {
  return {
    href: `/admin/reports/report/${item.reportId}`,
    title: item.reportType,
    content: item.reason,
    nickname: item.reporterNickname,
    createdAt: item.createdAt,

    processStatus: ProcessStatusBadgeConfig[item.status],
    answerStatus: ReplyStatusBadgeConfig(false), // TODO(지권): 백엔드 API 누락
  };
};

export const toInquiryItemVM = (item: AdminInquiriesItem): AdminReportsItemData => {
  return {
    href: `/admin/reports/inquiry/${item.inquiryId}`,
    title: item.title,
    content: item.content,
    nickname: item.userNickname,
    createdAt: item.createdAt,

    processStatus: ProcessStatusBadgeConfig[item.status],
    answerStatus: ReplyStatusBadgeConfig(item.answered),
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
    answerStatus: ReplyStatusBadgeConfig(item.answered),
  };
};
