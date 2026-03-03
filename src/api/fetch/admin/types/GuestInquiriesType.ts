import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ReportsType } from "@/types";
import { InquiryType } from "@/types/InquiryType";

export interface GetGuestInquiriesResponse extends ApiBaseResponseType<GuestInquiryResult> {}

export interface GuestInquiryResult {
  content: AdminGuestInquiryItem[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface AdminGuestInquiryItem {
  inquiryId: number;
  title: string;
  inquiryType: InquiryType;
  status: ReportsType;
  createdAt: string;
  userId: number;
  userNickname: string;
  userEmail: string;
  content: string;
  ip: string;
}
