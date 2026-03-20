import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export interface RecentFoundItem {
  postId: number;
  title: string;
  thumbnailImageUrl: string;
  createdAt: string;
}

export interface RecentFoundResponse extends ApiBaseResponseType<RecentFoundItem[]> {}
