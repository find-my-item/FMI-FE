import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface GetMetaDataResponse extends ApiBaseResponseType<PostMetaDataItem> {}

export interface PostMetaDataItem {
  title: string;
  summary: string;
  thumbnailUrl: string;
  address: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
}
