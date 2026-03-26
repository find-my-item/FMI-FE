import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { QueryKey } from "@tanstack/react-query";

export interface DeleteNoticeCommentResponse extends ApiBaseResponseType<string> {}

export interface DeleteNoticeCommentVariables {
  commentId: number;
  queryKey: QueryKey;
}
