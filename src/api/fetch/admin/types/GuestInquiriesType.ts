import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { InquiryStatus, InquiryType } from "@/types";

export interface GetGuestInquiriesResponse extends ApiBaseResponseType<GuestInquiryResult> {}

export interface GuestInquiryResult {
  items: AdminGuestInquiryItem[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface AdminGuestInquiryItem {
  inquiryId: number;
  title: string;
  inquiryType: InquiryType;
  status: InquiryStatus;
  createdAt: string;
  userId: number;
  nickname: null;
  email: string;
  content: string;
  ip: string;
  answered: boolean;
}
