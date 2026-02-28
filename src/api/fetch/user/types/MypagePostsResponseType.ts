import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { CategoryType, PostType } from "@/types";

export interface MypagePostsResponseType extends ApiBaseResponseType<MypagePostsType> {}

export interface MypagePostsType {
  posts: {
    id: number;
    title: string;
    summary: string;
    thumbnailImageUrl: string;
    address: string;
    postStatus: string;
    postType: PostType;
    category: CategoryType;
    favoriteCount: number;
    favoriteStatus: boolean;
    viewCount: number;
    isNew: boolean;
    isHot: boolean;
    createdAt: string;
    imageCount: number;
  }[];
  nextCursor: number;
  hasNext: boolean;
}
