import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { CategoryType, ItemStatus, PostType } from "@/types";

export interface GetListResponse extends ApiBaseResponseType<ListResult> {}

export interface ListResult {
  hasNext: boolean;
  nextCursor: number;
  posts: PostItem[];
}

export interface PostItem {
  postId: number;
  title: string;
  summary: string;
  thumbnailUrl: string;
  address: string;
  itemStatus: ItemStatus;
  postType: PostType;
  category: CategoryType;
  favoriteCount: number;
  createdAt: string;
}
