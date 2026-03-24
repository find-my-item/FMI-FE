import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { InquiryStatus, InquiryTargetType } from "@/types";

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
  inquiryType: InquiryTargetType;
  status: InquiryStatus;
  createdAt: string;
}
