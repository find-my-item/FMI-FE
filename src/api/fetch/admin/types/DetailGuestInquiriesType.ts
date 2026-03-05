import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { InquiryType, ReportsType } from "@/types";

export interface GetGuestInquiriesResponse extends ApiBaseResponseType<AdminDetailGuestInquiry> {}

export interface AdminDetailGuestInquiry {
  inquiryId: number;
  title: string;
  content: string;
  inquiryType: InquiryType;
  status: ReportsType;
  createdAt: string;
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
