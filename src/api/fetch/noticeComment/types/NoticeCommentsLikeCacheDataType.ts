export interface NoticeCommentsLikeCacheDataType {
  comments: Array<{
    id: number;
    isLike: boolean;
    likeCount: number;
  }>;
}
