import {
  CategoryFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "../FilterBottomSheet/types";
import { FiltersState } from "./filtersStateType";

export const DEFAULT_FILTERS: FiltersState = {
  region: "",
  category: "" as CategoryFilterValue,
  sort: "" as SortFilterValue,
  status: "" as StatusFilterValue,
};
