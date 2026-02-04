import { FiltersState } from "./filtersStateType";

export const getFilterSelectedFlags = (filters: FiltersState) => {
  const isRegionSelected = filters.region.trim().length > 0;
  const isCategorySelected = filters.category !== undefined;
  const isSortSelected = filters.sort !== "LATEST";
  const isStatusSelected = filters.status !== undefined;

  return {
    isRegionSelected,
    isCategorySelected,
    isSortSelected,
    isStatusSelected,
  };
};
