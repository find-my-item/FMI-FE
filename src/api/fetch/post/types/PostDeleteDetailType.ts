import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface PostDeleteDetailResponse extends ApiBaseResponseType<PostDeleteDetailResult> {}

export interface PostDeleteDetailRequestBody {
  postId: number;
}

export interface PostDeleteDetailResult {
  postId: number;
}
