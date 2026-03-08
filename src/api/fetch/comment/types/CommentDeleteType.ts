import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { QueryKey } from "@tanstack/react-query";

export interface CommentDeleteResponse extends ApiBaseResponseType<CommentDeleteResult> {}

export interface CommentDeleteResult {
  commentId: number;
  content: string;
}

export interface DeleteCommentVariables {
  commentId: number;
  queryKey: QueryKey;
}
