import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { InquiryStatus, InquiryType } from "@/types";

export interface GetInquiriesResponse extends ApiBaseResponseType<InquiriesResult> {}

export interface InquiriesResult {
  content: AdminInquiriesItem[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface AdminInquiriesItem {
  inquiryId: number;
  title: string;
  inquiryType: InquiryType;
  status: InquiryStatus;
  createdAt: string;
  userId: number;
  userNickname: string;
  userEmail: string;
  content: string;
  ip: string;
  answered: false;
}
