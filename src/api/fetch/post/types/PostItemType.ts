import { CategoryType, ItemStatus, PostType } from "@/types";

export interface GetListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    hasNext: hasNext;
    nextCursor: nextCursor;
    posts: PostItem[];
  };
}

export type hasNext = boolean;
export type nextCursor = string | null;

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
