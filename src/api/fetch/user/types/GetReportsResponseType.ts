import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

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
  targetType: "POST" | "COMMENT" | "USER" | "CHAT";
  targetTitle: string;
  reason: string;
  status: "PENDING" | "REVIEWED" | "RESOLVED";
  createdAt: string;
  resolvedAt: string;
}
