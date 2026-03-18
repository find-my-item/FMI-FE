import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface MypageCommentsResponseType extends ApiBaseResponseType<UserMeCommentsType> {}

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
  likeCount: number;
  imageList?: [{ id: number; imageUrl: string }];
  createdAt: string;
  like: boolean;
}
