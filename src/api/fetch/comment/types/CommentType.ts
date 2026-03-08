import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface PostCommentLikeResponse extends ApiBaseResponseType<FavoriteResult> {}

export interface PostLikeRequestBody {
  commentId: number;
}

export interface FavoriteResult {
  postId: number;
  favorite: boolean;
}
