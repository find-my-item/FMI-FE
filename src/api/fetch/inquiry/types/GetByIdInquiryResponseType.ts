import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { InquiryStatus } from "@/types";

export interface GetByIdInquiryResponseType extends ApiBaseResponseType<MypageInquiriesType> {}

export interface MypageInquiriesType {
  nickname: string;
  email: string;
  inquiryId: number;
  title: string;
  content: string;
  status: InquiryStatus;
  createdAt: string;
  imageUrls: string[];
  comments: InquiriesCommentType[];
}

export interface InquiriesCommentType {
  id: number;
  content: string;
  authorId: number;
  authorName: string;
  authorEmail: string;
  profileImg: string;
  parentId: number;
  replies: string[];
  imageList: string[];
  canEdit: boolean;
  canDelete: boolean;
  createdAt: string;
  admin: boolean;
}
