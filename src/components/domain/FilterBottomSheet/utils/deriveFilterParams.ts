// URL 쿼리 파라미터로부터 가져온 원시 데이터를 앱 내부에서 사용하는 규격화된 타입으로 변환하고, 필터의 활성 상태를 판별하는 역할을 하는 유틸리티

import { normalizeEnumValue } from "@/utils";
import {
  CategoryFilterValue,
  FindStatusFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "../_types/FilterType";

type Params = {
  region?: string | null;
  category?: string | null;
  sort?: string | null;
  status?: string | null;
  findStatus?: string | null;
};

export const normalizedFilterValues = ({ region, category, sort, status, findStatus }: Params) => {
  const normalizedCategory = normalizeEnumValue<Exclude<CategoryFilterValue, undefined>>(category);
  const normalizedSort = normalizeEnumValue<SortFilterValue>(sort);
  const normalizedStatus = normalizeEnumValue<Exclude<StatusFilterValue, undefined>>(status);
  const normalizedFindStatus =
    normalizeEnumValue<Exclude<FindStatusFilterValue, undefined>>(findStatus);
  return {
    normalizedCategory,
    normalizedSort,
    normalizedStatus,
    normalizedFindStatus,
  };
};

export const filterSelectionState = ({ region, category, sort, status, findStatus }: Params) => {
  const isRegionSelected = Boolean(region);
  const isCategorySelected = Boolean(category);
  const isSortSelected = Boolean(sort);
  const isStatusSelected = Boolean(status);
  const isFindStatusSelected = Boolean(findStatus);

  return {
    isRegionSelected,
    isCategorySelected,
    isSortSelected,
    isStatusSelected,
    isFindStatusSelected,
  };
};
