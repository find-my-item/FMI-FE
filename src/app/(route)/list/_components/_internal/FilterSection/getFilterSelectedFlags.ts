import { FiltersState } from "./filtersStateType";

export const getFilterSelectedFlags = (filters: FiltersState) => {
  const isRegionSelected = filters.region.trim().length > 0;
  const isCategorySelected = filters.category !== "";
  const isSortSelected = filters.sort !== "";
  const isStatusSelected = filters.status !== "";

  return {
    isRegionSelected,
    isCategorySelected,
    isSortSelected,
    isStatusSelected,
  };
};
