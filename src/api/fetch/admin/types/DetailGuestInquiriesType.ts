import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { InquiryType, InquiryStatus } from "@/types";

export interface GetDetailGuestInquiriesResponse extends ApiBaseResponseType<AdminDetailGuestInquiry> {}

export interface AdminDetailGuestInquiry {
  inquiryId: number;
  title: string;
  content: string;
  inquiryType: InquiryType;
  status: InquiryStatus;
  createdAt: string;
  email: string;
  answered: boolean;
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
