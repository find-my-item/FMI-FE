import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ImageList } from "@/types";

export interface PostPostsCommentRequestBody {
  request: PostPostsCommentRequest;
  image: File[];
}

export interface PostPostsCommentRequest {
  content: string;
  parentId?: number | null;
}

export interface PostPostsCommentResponse extends ApiBaseResponseType<CommentData> {}

export interface CommentData {
  id: number;
  content: string;
  createdAt: string;
  likeCount: number;
  canEdit: boolean;
  canDelete: boolean;
  authorResponse: AuthorResponse;
  commentImageResponseList: ImageList[];
}

interface AuthorResponse {
  userId: number;
  nickName: string;
  profileImage: string;
}
