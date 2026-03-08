/**
 * @author jikwon
 *
 * * URL 쿼리 파라미터로 관리되는 원시 데이터를 앱 내 규격화된 타입으로 변환하거나,
 * 각 필터의 활성화 여부를 판별하는 유틸리티 모음입니다.
 */

import { normalizeEnumValue } from "@/utils";
import {
  CategoryFilterValue,
  FindStatusFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "../../components/domain/FilterSectionBottomSheet/_types/types";
import { ActivityFilterValue } from "@/app/(route)/mypage/activity/_types/ActivityFilterType";
import { SimpleSortType } from "@/types";

type Params = {
  region?: string | null;
  category?: string | null;
  sort?: string | null;
  status?: string | null;
  findStatus?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  activity?: string | null;
  simpleSort?: string | null;
};

export const normalizedFilterValues = ({
  category,
  sort,
  status,
  findStatus,
  activity,
  simpleSort,
}: Params) => {
  const normalizedCategory = normalizeEnumValue<Exclude<CategoryFilterValue, undefined>>(category);
  const normalizedSort = normalizeEnumValue<SortFilterValue>(sort);
  const normalizedStatus = normalizeEnumValue<Exclude<StatusFilterValue, undefined>>(status);
  const normalizedFindStatus =
    normalizeEnumValue<Exclude<FindStatusFilterValue, undefined>>(findStatus);
  const normalizedActivity = normalizeEnumValue<Exclude<ActivityFilterValue, undefined>>(activity);
  const normalizedSimpleSort = normalizeEnumValue<SimpleSortType>(simpleSort);

  return {
    normalizedCategory,
    normalizedSort,
    normalizedStatus,
    normalizedFindStatus,
    normalizedActivity,
    normalizedSimpleSort,
  };
};

export const filterSelectionState = ({
  region,
  category,
  sort,
  status,
  findStatus,
  startDate,
  endDate,
  activity,
  simpleSort,
}: Params) => {
  const isRegionSelected = Boolean(region);
  const isCategorySelected = Boolean(category);
  const isSortSelected = Boolean(sort);
  const isStatusSelected = Boolean(status);
  const isFindStatusSelected = Boolean(findStatus);
  const isDateSelected = Boolean(startDate || endDate);
  const isActivitySelected = Boolean(activity);
  const isSimpleSortSelected = Boolean(simpleSort);

  return {
    isRegionSelected,
    isCategorySelected,
    isSortSelected,
    isStatusSelected,
    isFindStatusSelected,
    isDateSelected,
    isActivitySelected,
    isSimpleSortSelected,
  };
};
