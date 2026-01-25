export type CommentCardType = {
  commentId: number;
  mentionUser?: string;
  comment: string;
  date: string;
  like: number;
  thumbnailUrl?: string;
};
