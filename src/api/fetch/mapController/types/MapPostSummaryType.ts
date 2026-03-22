import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { PostItem } from "@/api/fetch/post";

export type MapPostSummaryPostItem = PostItem;

/** `/main/posts/{postId}/summary` 응답의 `result` 본문 */
export interface MapPostSummaryResult {
  posts: MapPostSummaryPostItem[];
  hasNext: boolean;
  nextDistance: number | null;
  nextPostId: number | null;
}

export type MapPostSummaryResponse = ApiBaseResponseType<MapPostSummaryResult>;
