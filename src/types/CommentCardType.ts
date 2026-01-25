export type CommentCardType = {
  commentId: number;
  mentionUser?: string;
  comment: string;
  createdAt: string;
  like: number;
  thumbnailUrl?: string;
};
