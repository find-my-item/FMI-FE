import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { CommentItemType, AuthorResponse, ImageList } from "@/types";

export interface GetNoticeCommentsResponse extends ApiBaseResponseType<GetNoticeCommentsApiData> {}

export type GetNoticeCommentsApiData = {
  comments: NoticeCommentItemApiType[];
  hasNext: boolean;
  cursor: number;
};

export type NoticeCommentItemApiType = {
  id: number;
  content: string;
  deleted: boolean;
  depth: number;
  createdAt: string;
  authorResponse: AuthorResponse;
  childCommentCount: number;
  imageList: ImageList[];
  likeCount: number;
  canEdit: boolean;
  canDelete: boolean;
  like: boolean;
};

export type GetNoticeCommentsData = {
  comments: CommentItemType[];
  hasNext: boolean;
  cursor: number;
  totalCommentCount: number;
  remainingCount: number;
};
