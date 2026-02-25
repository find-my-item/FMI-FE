import { CategoryType, PostType, Radius } from "@/types";
import { PostDetailData } from "./PostDetailType";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface PostPostsWriteRequestBody {
  request: PostWriteRequest;
  images: File[];
}

export interface PostPostsWriteResponse extends ApiBaseResponseType<PostDetailData> {}

export interface PostWriteRequest {
  thumbnailImageId?: number;
  latitude: number;
  date: string;
  keepImageIdList?: string[];
  longitude: number;
  tempPostId?: number;
  radius: Radius;
  address: string;
  title: string;
  content: string;
  postType: PostType;
  category: CategoryType;
}
