import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { CommentItemType, AuthorResponse, ImageList } from "@/types";

export interface GetRepliesPostsCommentsResponse extends ApiBaseResponseType<GetRepliesPostsCommentsData> {}

export type GetRepliesPostsCommentsData = {
  comments: RepliesCommentItemType[];
  hasNext: boolean;
  cursor: number;
};

interface RepliesCommentItemType {
  id: number;
  deleted: boolean;
  depth: number;
  createdAt: string;
  authorResponse: AuthorResponse;
  replyCount: number;
  nextReplyCursor: number | null;
  imageList: ImageList[];
  childrenCommentList: CommentItemType[];
  likeCount: number;
  isLike: boolean;
}
