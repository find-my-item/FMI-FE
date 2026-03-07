import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { InquiryType, ReplyStatus, ReportsType } from "@/types";

export interface GetDetailGuestInquiriesResponse extends ApiBaseResponseType<AdminDetailGuestInquiry> {}

// TODO(지권): requestStatus 누락
export interface AdminDetailGuestInquiry {
  inquiryId: number;
  title: string;
  content: string;
  inquiryType: InquiryType;
  requestStatus: ReportsType;
  createdAt: string;
  email: string;
  status: ReplyStatus;
  comments: GuestInquiryComments[];
}

export interface GuestInquiryComments {
  id: number;
  content: string;
  authorId: number;
  authorName: string;
  authorEmail: string;
  parentId: number;
  replies: string[];
  createdAt: string;
  updatedAt: string;
  canEdit: boolean;
  canDelete: boolean;
}
