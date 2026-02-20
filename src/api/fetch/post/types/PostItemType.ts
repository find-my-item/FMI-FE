import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { CategoryType, ItemStatus, PostType } from "@/types";

export interface GetListResponse extends ApiBaseResponseType<ListResult> {}

export interface ListResult {
  hasNext: boolean;
  nextCursor: number;
  posts: PostItem[];
}

export interface PostItem {
  id: number;
  title: string;
  summary: string;
  thumbnailImageUrl: string;
  address: string;
  postStatus: ItemStatus;
  postType: PostType;
  category: CategoryType;
  favoriteCount: number;
  favoriteStatus: boolean;
  viewCount: number;
  isNew: boolean;
  isHot: boolean;
  createdAt: string;
  imageCount: number;
}

export type PostSearchResult = {
  postList: PostItem[];
  nextCursor: string | null;
  hasNext: boolean;
};

export type PostSearchResponse = ApiBaseResponseType<PostSearchResult>;
