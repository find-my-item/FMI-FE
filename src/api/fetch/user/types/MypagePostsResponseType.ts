import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { PostItem } from "../../post";

export interface MypagePostsResponseType extends ApiBaseResponseType<MypagePostsType> {}

export interface MypagePostsType {
  posts: PostItem[];
  nextCursor: number;
  hasNext: boolean;
}
