import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ReportTargetType, ReportType, ReportStatus } from "@/types";

export interface GetDetailReportResponse extends ApiBaseResponseType<AdminDetailReport> {}

export interface AdminDetailReport {
  reportId: number;
  targetType: ReportTargetType;
  targetId: number;
  reportType: ReportType;
  reason: string;
  status: ReportStatus;
  answered: boolean;
  adminAnswer: string;
  reporterNickname: string;
  reporterEmail: string;
  createdAt: string;
  resolvedAt: string;
}
