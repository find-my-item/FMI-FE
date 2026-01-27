import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { CategoryType, ItemStatus, PostType } from "@/types";

export interface GetUserProfileDataResponse extends ApiBaseResponseType<UserProfileIdDataType> {}

export interface UserProfileIdDataType {
  userId: number;
  nickname: string;
  profileImg: string;
  posts: Array<UserPostsDataType>;
  comments: Array<UserCommentsDataType>;
}

export interface UserPostsDataType {
  postId: number;
  title: string;
  summary: string;
  thumbnailUrl: string;
  address: string;
  itemStatus: ItemStatus;
  postType: PostType;
  category: CategoryType;
  favoriteCount: number;
  favoriteStatus: boolean;
  viewCount: number;
  createdAt: string;
  hot: boolean;
  new: boolean;
}

export interface UserCommentsDataType {
  commentId: number;
  postId: number;
  postTitle: string;
  content: string;
  createdAt: string;
}
