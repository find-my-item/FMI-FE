import { NoticeCategory } from "@/types";

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

export interface SortInfo {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface PageableInfo {
  offset: number;
  sort: SortInfo;
  unpaged: boolean;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
}

export interface NoticeListResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: NoticeItem[];

  number: number;
  sort: SortInfo;
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
  numberOfElements: number;

  pageable: PageableInfo;
  first: boolean;
  last: boolean;
}
