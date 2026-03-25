import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { CommentItemType } from "@/types";
import { NoticeCommentItemApiType } from "./GetNoticeComments";

export interface GetRepliesNoticeCommentsResponse extends ApiBaseResponseType<GetRepliesNoticeCommentsApiData> {}

export type GetRepliesNoticeCommentsApiData = {
  comments: NoticeCommentItemApiType[];
  hasNext: boolean;
  nextPage: number;
  totalCommentCount: number;
  remainingCount: number;
};

export type GetRepliesNoticeCommentsData = {
  comments: CommentItemType[];
  hasNext: boolean;
  nextPage: number;
  totalCommentCount: number;
  remainingCount: number;
};
