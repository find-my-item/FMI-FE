import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { NoticeCategory } from "@/types";

/** GET /notices 커서 기반 페이지네이션 응답의 result 필드 */
export interface GetNoticesResult {
  content: NoticeItem[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface GetNoticesResponse extends ApiBaseResponseType<GetNoticesResult> {}

export interface NoticeItem {
  noticeId: number;
  title: string;
  category: NoticeCategory;
  pinned: boolean;
  viewCount: number;
  createdAt: string;
  likeCount: number;
  thumbnailUrl: string | null;
  isNew: boolean;
  isHot: boolean;
}
