import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface UserMeCommentsResponse extends ApiBaseResponseType<UserMeCommentsType> {}

export interface UserMeCommentsType {
  comments: CommentItem[];
  nextCursor: number;
  hasNext: boolean;
}

export interface CommentItem {
  commentId: number;
  postId: number;
  postTitle: string;
  content: string;
  createdAt: string;
}
