export interface GetListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PostItem[];
}

export interface PostItem {
  postId: number;
  title: string;
  summary: string;
  thumbnailUrl: string;
  address: string;
  itemStatus: string;
  postType: string;
  category: string;
  favoriteCount: number;
  createdAt: string;
}
