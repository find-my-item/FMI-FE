import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ReportStatus, ReportTargetType, ReportType } from "@/types";

export interface GetReportResponse extends ApiBaseResponseType<ReportResult> {}

export interface ReportResult {
  content: AdminReportItem[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface AdminReportItem {
  reportId: number;
  targetType: ReportTargetType;
  targetId: number;
  reportType: ReportType;
  status: ReportStatus;
  reason: string;
  adminNote: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string;
  reporterId: number;
  nickname: string;
  email: string;
  answered: boolean;
}
