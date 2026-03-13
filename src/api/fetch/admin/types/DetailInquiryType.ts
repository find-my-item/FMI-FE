import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { InquiryType, InquiryStatus } from "@/types";

export interface GetDetailInquiryResponse extends ApiBaseResponseType<AdminDetailInquiry> {}

export interface AdminDetailInquiry {
  inquiryId: number;
  title: string;
  content: string;
  inquiryType: InquiryType;
  status: InquiryStatus;
  createdAt: string;
  nickname: string;
  ip: string;
  answered: boolean;
  comments: InquiryComments[];
}

export interface InquiryComments {
  id: number;
  content: string;
  authorId: number;
  authorName: string;
  profileImg: string;
  createdAt: string;
  imageList: string[];
}
