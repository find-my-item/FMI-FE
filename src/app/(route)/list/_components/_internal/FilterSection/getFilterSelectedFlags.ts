import { FiltersState } from "./filtersStateType";

const DEFAULT_SORT = "LATEST";

export const getFilterSelectedFlags = (filters: FiltersState) => {
  const isRegionSelected = filters.region.trim().length > 0;
  const isCategorySelected = filters.category !== "";
  const isSortSelected = filters.sort !== DEFAULT_SORT;
  const isStatusSelected = filters.status !== "";

  return {
    isRegionSelected,
    isCategorySelected,
    isSortSelected,
    isStatusSelected,
  };
};
