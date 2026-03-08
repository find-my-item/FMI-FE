import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { CommentItemType } from "@/types";

export interface GetPostsCommentsResponse extends ApiBaseResponseType<GetPostsCommentsData> {}

export type GetPostsCommentsData = {
  comments: CommentItemType[];
  hasNext: boolean;
  nextPage: number;
  remainingCount: number;
};
