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
  authorResponse: authorResponse;
  replyCount: number;
  nextReplyCursor: null;
  imageList: imageList[];
  childrenCommentList: CommentData[];
  likeCount: number;
  isLike: boolean;
};

interface authorResponse {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

interface imageList {
  id: number;
  imageUrl: string;
}
