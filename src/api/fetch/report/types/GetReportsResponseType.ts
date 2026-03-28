import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ReportStatus, ReportTargetType, ReportType } from "@/types";

export interface GetReportsResponseType extends ApiBaseResponseType<MypageReportType> {}

export interface MypageReportType {
  content: ReportItemType[];
  nextCursor: number;
  hasNext: boolean;
}

export interface ReportItemType {
  nickname: string;
  reportId: number;
  targetType: ReportTargetType;
  targetId: number;
  targetTitle: string;
  reportType: ReportType;
  reason: string;
  status: ReportStatus;
  createdAt: string;
  resolvedAt: string;
}
