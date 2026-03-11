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
  adminNote: string;
  createdAt: string;
  resolvedAt: string;
  answered: boolean;
  nickname: string;
}
