import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface MypageReportsResponseType extends ApiBaseResponseType<ReportItemType> {}

export interface ReportItemType {
  nickname: string;
  reportId: number;
}
