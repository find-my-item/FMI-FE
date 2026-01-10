import { CategoryType, PostType } from "@/types";
import { PostDetailData } from "./PostDetailType";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface PostPostsWriteRequestBody {
  request: PostWriteRequest;
  images: string[];
}

export interface PostPostsWriteResponse extends ApiBaseResponseType<PostDetailData> {}

export interface PostWriteRequest {
  postType: PostType;
  title: string;
  date: string;
  address: string;
  latitude: number;
  longitude: number;
  content: string;
  radius: number;
  category: CategoryType;
  temporarySave: boolean;
}
