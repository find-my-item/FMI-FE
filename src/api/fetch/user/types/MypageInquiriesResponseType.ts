import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface MypageInquiriesResponseType extends ApiBaseResponseType<MypageInquiriesType> {}

export interface MypageInquiriesType {
  content: InquiriesItemType[];
  nextCursor: number;
  hasNext: boolean;
}

export interface InquiriesItemType {
  nickname: string;
  inquiryId: number;
  title: string;
  content: string;
  reason: string;
  status: "RECEIVED" | "PENDING" | "ANSWERED";
  createdAt: string;
  resolvedAt: string;
}
