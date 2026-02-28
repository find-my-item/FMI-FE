export interface SortInfo {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

// Pageable 응답 내 sort 전용 타입 (확장 대비)
export interface PageableSortInfo extends SortInfo {}

export interface PageableInfo {
  offset: number;
  sort: PageableSortInfo;
  unpaged: boolean;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
}

export interface PageResponse<T> {
  totalElements: number;
  totalPages: number;
  size: number;
  content: T[];
  number: number;
  sort: SortInfo;
  pageable: PageableInfo;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
