import { CategoryFilterValue, SortFilterValue, StatusFilterValue } from "@/types";

export type FiltersState = {
  region: string;
  category: CategoryFilterValue;
  sort: SortFilterValue;
  status: StatusFilterValue;
};
