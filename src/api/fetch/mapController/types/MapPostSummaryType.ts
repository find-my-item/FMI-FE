import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { PostItem } from "@/api/fetch/post";

export interface MapPostSummaryResponse extends ApiBaseResponseType<PostItem[]> {}
