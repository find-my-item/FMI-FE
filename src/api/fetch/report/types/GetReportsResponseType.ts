import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ReportStatus, ReportTargetType } from "@/types";

export interface GetReportsResponseType extends ApiBaseResponseType<MypageReportType> {}

export interface MypageReportType {
  content: ReportItemType[];
  nextCursor: number;
  hasNext: boolean;
}

export interface ReportItemType {
  nickname: string;
  reportId: number;
  targetId: number;
  targetType: ReportTargetType;
  targetTitle: string;
  reason: string;
  status: ReportStatus;
  createdAt: string;
  resolvedAt: string;
}
