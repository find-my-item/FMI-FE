export type PostStatus = "SEARCHING" | "FOUND";

export interface PutPostStatusRequestBody {
  postStatus: PostStatus;
}
