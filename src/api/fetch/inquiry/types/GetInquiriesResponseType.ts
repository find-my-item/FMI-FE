import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface GetInquiriesResponseType extends ApiBaseResponseType<MypageInquiryType> {}

export interface MypageInquiryType {
  content: InquiryItemType[];
  nextCursor: number;
  hasNext: boolean;
}

export interface InquiryItemType {
  nickname: string;
  inquiryId: number;
  title: string;
  content: string;
  inquiryType: "ACCOUNT_LOGIN" | "USAGE" | "BUG" | "SUGGESTION" | "ETC";
  status: "RECEIVED" | "PENDING" | "ANSWERED";
  createdAt: string;
}
