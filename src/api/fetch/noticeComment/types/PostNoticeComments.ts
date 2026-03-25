import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { AuthorResponse, ImageList } from "@/types";

export type PostNoticeCommentRequest = {
  content: string;
  parentId?: number | null;
};

export type PostNoticeCommentResponseData = {
  id: number;
  content: string;
  deleted: boolean;
  depth: number;
  createdAt: string;
  authorResponse: AuthorResponse;
  childCommentCount: number;
  imageList: ImageList[];
  likeCount: number;
  canEdit: boolean;
  canDelete: boolean;
  like: boolean;
};

export interface PostNoticeCommentResponse extends ApiBaseResponseType<PostNoticeCommentResponseData> {}
