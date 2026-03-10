import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { NoticeCategory } from "@/types";

export interface NoticeDetail {
  noticeId: number;
  title: string;
  content: string;
  summary: string;
  category: NoticeCategory;
  pinned: boolean;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  authorName: string;
  thumbnailUrl: string | null;
  images: string[] | null;
  isNew: boolean;
  isHot: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NoticeDetailResponse extends ApiBaseResponseType<NoticeDetail> {}
