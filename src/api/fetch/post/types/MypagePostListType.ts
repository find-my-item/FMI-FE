import { CategoryType, ItemStatus, PostType } from "@/types";

export interface MypagePostListType {
  postId: number;
  title: string;
  summary: string;
  thumbnailUrl: string;
  address: string;
  itemStatus: ItemStatus;
  postType: PostType;
  category: CategoryType;
  favoriteCount: number;
  viewCount: number;
  createdAt: string;
  hot: boolean;
  new: boolean;
}
