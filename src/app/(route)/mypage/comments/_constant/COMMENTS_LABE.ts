type SortFilterValue = "LATEST" | "OLDEST";

export const SORT_DEFAULT_LABEL = "최신순";
export const SORT_LABEL_MAP: Record<SortFilterValue, string> = {
  LATEST: "최신순",
  OLDEST: "오래된 순",
};

export interface CommentFilterState {
  date: string;
  sort: SortFilterValue;
}

export const COMMENT_DEFAULT_FILTERS: CommentFilterState = {
  date: "",
  sort: "LATEST",
};
