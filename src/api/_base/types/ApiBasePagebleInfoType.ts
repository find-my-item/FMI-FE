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
