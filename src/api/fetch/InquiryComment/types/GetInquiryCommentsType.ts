import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface GetInquiryCommentsResponse extends ApiBaseResponseType<InquiryCommentsResult> {}

export interface InquiryCommentsResult {
  comments: InquiryCommentsItem[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface InquiryCommentsItem {
  id: number;
  content: string;
  authorId: number;
  authorName: string;
  authorEmail: string;
  parentId: number | null;
  replies: string[];
  createdAt: string;
  canEdit: boolean;
  canDelete: boolean;
  profileImg: string;
  imageList: string[];
  admin: boolean;
}
