import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { CategoryType, ItemStatus, PostType } from "@/types";

interface GetMarkerData {
  postId: number;
  latitude: number;
  longitude: number;
  category: CategoryType;
  postType: PostType;
  postStatus: ItemStatus;
}

export interface GetMarkerResponse extends ApiBaseResponseType<GetMarkerData[]> {}
