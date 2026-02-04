import { FiltersStateType } from "./FiltersStateType";
import {
  CategoryFilterValue,
  FindStatusFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "./FilterType";

export const DEFAULT_FILTERS: FiltersStateType = {
  region: "",
  category: "" as CategoryFilterValue,
  sort: "" as SortFilterValue,
  status: "" as StatusFilterValue,
  findStatus: "" as FindStatusFilterValue,
};
