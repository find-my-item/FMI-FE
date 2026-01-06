import { normalizeEnumValue } from "@/utils";
import {
  CategoryFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "../../_components/_internal/FilterBottomSheet/types";

type Params = {
  region?: string | null;
  category?: string | null;
  sort?: string | null;
  status?: string | null;
};

export const normalizedFilterValues = ({ region, category, sort, status }: Params) => {
  const normalizedCategory = normalizeEnumValue<CategoryFilterValue>(category);
  const normalizedSort = normalizeEnumValue<SortFilterValue>(sort);
  const normalizedStatus = normalizeEnumValue<StatusFilterValue>(status);

  return {
    normalizedCategory,
    normalizedSort,
    normalizedStatus,
  };
};

export const filterSelectionState = ({ region, category, sort, status }: Params) => {
  const isRegionSelected = Boolean(region);
  const isCategorySelected = Boolean(category);
  const isSortSelected = Boolean(sort);
  const isStatusSelected = Boolean(status);

  return {
    isRegionSelected,
    isCategorySelected,
    isSortSelected,
    isStatusSelected,
  };
};
