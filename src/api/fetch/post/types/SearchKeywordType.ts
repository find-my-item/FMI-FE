import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { PostItem } from "./PostItemType";

export interface GetSearchKeywordResponse extends ApiBaseResponseType<SearchKeywordResult> {}

export interface SearchKeywordResult {
  postList: PostItem[];
  postCount: number;
  hasNext: boolean;
  nextCursor: number;
}
