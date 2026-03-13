import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ReportTargetType, ReportType, ReportStatus } from "@/types";

export interface GetDetailReportResponse extends ApiBaseResponseType<AdminDetailReport> {}

export interface AdminDetailReport {
  reportId: number;
  targetType: ReportTargetType;
  targetId: number;
  targetTitle: string;
  reportType: ReportType;
  reason: string;
  status: ReportStatus;
  answered: boolean;
  adminAnswer: string;
  adminId: number;
  adminNickname: string;
  adminProfileImg: string;
  answerImageList: string[];
  answeredAt: string;
  reporterNickname: string;
  reporterEmail: string;
  createdAt: string;
  resolvedAt: string;
}
