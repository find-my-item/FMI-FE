import { CategoryType } from "@/types";

export interface GetListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PostItem[];
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

export type ItemStatus = "SEARCHING" | "FOUND";
export type PostType = "LOST" | "FOUND";
