export interface SortInfo {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface PageableSortInfo extends SortInfo {}

export interface PageableInfo {
  offset: number;
  sort: PageableSortInfo;
  unpaged: boolean;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
}
