import { SimpleSortType } from "@/types";

export type SimpleSortFilterValue = SimpleSortType | undefined;

export interface CommentFilterState {
  startDate: string;
  endDate: string;
  simpleSort: SimpleSortFilterValue;
}
