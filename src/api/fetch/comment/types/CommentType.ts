import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { QueryKey } from "@tanstack/react-query";

export interface PostCommentLikeResponse extends ApiBaseResponseType<FavoriteResult> {}

export interface PostLikeRequestBody {
  commentId: number;
}

export interface FavoriteResult {
  postId: number;
  favorite: boolean;
}

export interface ToggleCommentLikeVariables {
  commentId: number;
  queryKey: QueryKey;
}
