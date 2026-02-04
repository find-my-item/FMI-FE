export interface NoticeItem {
  totalElements: number;
  totalPages: number;
  size: number;
  content: ContentItems;
  sort: string;
  numberOfElements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface Pageable {
  offset: number;
  sort: string;
  unpaged: boolean;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
}

export interface ContentItems {
  Items: {
    noticeId: number;
    title: string;
    category: string;
    pinned: boolean;
    viewCount: number;
    createdAt: string;
  };
}
