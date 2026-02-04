import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { CategoryType, ItemStatus, PostType, Radius } from "@/types";

export interface GetDetailPostResponse extends ApiBaseResponseType<PostDetailData> {}

export type PostDetailData = {
  id: number;
  title: string;
  content: string;
  address: string;
  latitude: number;
  longitude: number;
  postType: PostType;
  postStatus: ItemStatus;
  radius: Radius;
  category: CategoryType;
  favoriteCount: number;
  favoriteStatus: boolean;
  viewCount: number;
  isNew: boolean;
  isHot: boolean;
  createdAt: string;
  imageResponseList: ImageResponse[];
  postUserInformation: userInformation;
};

export type ImageType = "THUMBNAIL" | "NORMAL";

export type ImageResponse = {
  id: number;
  imgUrl: string;
  imageType: ImageType;
};

export interface userInformation {
  userId: number;
  nickName: string;
  profileImage: string;
  postCount: number;
  chattingCount: number;
}
