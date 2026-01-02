import {
  CategoryFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "../FilterBottomSheet/types";

export type FiltersState = {
  region: string;
  category: CategoryFilterValue;
  sort: SortFilterValue;
  status: StatusFilterValue;
};
