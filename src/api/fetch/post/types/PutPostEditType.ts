import { ItemStatus } from "@/types";
import { PostWriteRequest } from "./PostWriteType";

export interface PutPostEditRequest extends PostWriteRequest {
  postStatus: ItemStatus;
  keepImageIdList: number[];
  thumbnailImageId: number | null;
}

export interface PutPostEditRequestBody {
  request: PutPostEditRequest;
  image?: File[];
}
