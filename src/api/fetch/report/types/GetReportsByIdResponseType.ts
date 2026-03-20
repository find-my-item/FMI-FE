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
  createdAt: string;
  resolvedAt: string;
  // TODO(수현): api 추가 요청 드린 상황입니다. 관리자 이미지, 닉네임은 임시로 작업하겠습니다.
  adminNickname: string;
  adminProfileImg: string;
  answerImageList: string[];
}
