import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { CategoryType, ItemStatus, PostType } from "@/types";

export interface GetDetailPostResponse extends ApiBaseResponseType<PostDetailData> {}

export type PostDetailData = {
  postId: number;
  title: string;
  content: string;
  address: string;
  latitude: number;
  longitude: number;
  postType: PostType;
  itemStatus: ItemStatus;
  imageUrls: Array<string>;
  radius: number; // TODO(지권): 반경 1000, 3000, 5000 변경
  category: CategoryType;
  favoriteCount: number;
  favoriteStatus: boolean;
  viewCount: number;
  profileUrl: string | null;
  nickName: string;
  createdAt: string;
  chatRoomCount: number;
  userPostCount: number;
  new: boolean;
  hot: boolean;
};
