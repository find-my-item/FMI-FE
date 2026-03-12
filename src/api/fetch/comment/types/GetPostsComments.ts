import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { CommentItemType } from "@/types";

export interface GetPostsCommentsResponse extends ApiBaseResponseType<GetPostsCommentsData> {}

export type GetPostsCommentsData = {
  comments: CommentItemType[];
  hasNext: boolean;
  nextPage: number;
  remainingCount: number;
  totalCommentCount: number; // TODO(지권): 백엔드 필드 추가 후 확인 필요
};
