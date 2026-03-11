import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { InquiryType, InquiryStatus, ReportTargetType, ReportType, ReportStatus } from "@/types";

export interface GetDetailReportsResponse extends ApiBaseResponseType<AdminDetailReports> {}

export interface AdminDetailReports {
  type: DetailReportsType;
  id: number;
  createdAt: string;
  targetType: ReportTargetType;
  targetId: number;
  reportType: ReportType;
  reason: string;
  reportStatus: ReportStatus;
  adminNote: string;
  resolvedAt: string;
  answered: boolean;
  reporterId: number;
  reporterNickname: string;
  reporterEmail: string;
  title: string;
  content: string;
  inquiryType: InquiryType;
  inquiryStatus: InquiryStatus;
  userId: number;
  userNickname: string;
  userEmail: string;
  comments: ReportsComments[];
}

export interface ReportsComments {
  id: number;
  content: string;
  authorId: number;
  authorName: string;
  authorEmail: string;
  parentId: number;
  replies: string[];
  createdAt: string;
  updatedAt: string;
  canEdit: boolean;
  canDelete: boolean;
}

export type DetailReportsType = "REPORT" | "INQUIRY";
