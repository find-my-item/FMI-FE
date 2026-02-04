import { FiltersStateType } from "../_types/filtersStateType";

export const getFilterSelectedFlags = (filters: FiltersStateType) => {
  const isRegionSelected = filters.region.trim().length > 0;
  const isCategorySelected = filters.category !== undefined;
  const isSortSelected = filters.sort !== "LATEST";
  const isStatusSelected = filters.status !== undefined;
  const isFindStatusSelected = filters.findStatus !== undefined;

  return {
    isRegionSelected,
    isCategorySelected,
    isSortSelected,
    isStatusSelected,
    isFindStatusSelected,
  };
};
