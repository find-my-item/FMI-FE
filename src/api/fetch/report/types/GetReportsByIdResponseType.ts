import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface GetReportsByIdResponseType extends ApiBaseResponseType<ReportByIdType> {}

export interface ReportByIdType {
  nickname: string;
  reportId: number;
  targetId: number;
  targetType: "POST" | "COMMENT" | "USER" | "CHAT";
  targetTitle: string;
  reason: string;
  status: "PENDING" | "REVIEWED" | "RESOLVED";
  answered: boolean;
  adminAnswer: string;
  adminNickname: string;
  adminProfileImg: string;
  answerImageList: string[];
  resolvedAt: string;
  createdAt: string;
}
