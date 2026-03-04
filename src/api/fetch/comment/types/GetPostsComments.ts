import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface GetPostsCommentsResponse extends ApiBaseResponseType<GetPostsCommentsData> {}

export type GetPostsCommentsData = {
  comments: CommentData[];
  hasNext: boolean;
  cursor: number;
};

export type CommentData = {
  id: number;
  deleted: boolean;
  depth: number;
  createdAt: string;
  authorResponse: AuthorResponse;
  replyCount: number;
  nextReplyCursor: null;
  imageList: ImageList[];
  childrenCommentList: CommentData[];
  likeCount: number;
  isLike: boolean;
};

interface AuthorResponse {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

export interface ImageList {
  id: number;
  imageUrl: string;
}
