import { PageResponse } from "@/api/_base/types/ApiBasePageableInfoType";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { NoticeCategory } from "@/types";

export interface GetNoticesResponse extends ApiBaseResponseType<PageResponse<NoticeItem>> {}

export interface NoticeItem {
  noticeId: number;
  title: string;
  category: NoticeCategory;
  pinned: boolean;
  viewCount: number;
  createdAt: string;
  likeCount: number;
  thumbnailUrl: string;
  isNew: boolean;
  isHot: boolean;
}
