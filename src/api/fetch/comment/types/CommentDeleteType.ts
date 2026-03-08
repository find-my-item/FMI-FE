import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface CommentDeleteResponse extends ApiBaseResponseType<CommentDeleteResult> {}

export interface CommentDeleteResult {
  commentId: number;
  content: string;
}
