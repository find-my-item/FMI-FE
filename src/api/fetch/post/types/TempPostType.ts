import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { CategoryType, PostType, Radius } from "@/types";

export interface GetTempPostResponse extends ApiBaseResponseType<TempPostData> {}

type ImageType = "THUMBNAIL" | "NORMAL";

export interface TempPostImage {
  id: number;
  imgUrl: string;
  imageType: ImageType;
}

export interface TempPostData {
  postId: number;
  postType: PostType;
  category: CategoryType;
  radius: Radius;
  date: string;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
  content: string;
  images: TempPostImage[];
  updatedAt: string;
  createdAt: string;
}

export interface TempPostWriteRequestBody {
  request: TempPostWriteRequest;
  images: File[];
}

export interface TempPostWriteRequest {
  latitude?: number;
  date: string;
  keepImageIdList?: string[];
  longitude?: number;
  radius?: number;
  address?: string;
  title?: string;
  content?: string;
  postType?: PostType;
  category?: CategoryType;
}
