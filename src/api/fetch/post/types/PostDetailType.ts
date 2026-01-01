import { CategoryType } from "@/types";
import { ItemStatus, PostType } from "./PostItemType";

export interface GetPostDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PostDetail;
}

export interface PostDetail {
  postId: number;
  title: string;
  content: string;
  address: string;
  latitude: number;
  longitude: number;
  postType: PostType;
  itemStatus: ItemStatus;
  imageUrls: Array<string>;
  radius: number;
  category: CategoryType;
  favoriteCount: number;
  favoriteStatus: boolean;
}
