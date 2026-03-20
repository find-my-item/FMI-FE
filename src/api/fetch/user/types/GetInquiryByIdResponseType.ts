import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface MypageInquiriesResponseType extends ApiBaseResponseType<MypageInquiriesType> {}

export interface MypageInquiriesType {
  nickname: string;
  email: string;
  inquiryId: number;
  title: string;
  content: string;
  status: "RECEIVED" | "PENDING" | "ANSWERED";
  createdAt: string;
  imageUrls: string[];
  comments: InquiriesCommentType[];
  nextCursor: number;
  hasNext: boolean;
}

export interface InquiriesCommentType {
  id: any;
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
