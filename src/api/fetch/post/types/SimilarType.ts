import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface GetSimilarResponse extends ApiBaseResponseType<SimilarDataItem[]> {}

export interface SimilarDataItem {
  postId: number;
  title: string;
  thumbnailImageUrl: string;
  address: string;
  favoriteCount: number;
  favoriteStatus: boolean;
  viewCount: number;
  createdAt: string;
  // category: string;
}
