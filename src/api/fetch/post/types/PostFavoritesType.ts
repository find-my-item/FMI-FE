import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface PostFavoritesWriteResponse extends ApiBaseResponseType<FavoriteResult> {}

export interface PostFavoritesWriteRequestBody {
  postId: number;
}

export interface FavoriteResult {
  postId: number;
  favorite: boolean;
}
