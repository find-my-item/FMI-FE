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
} from "../_types/types";
import { YmdDate } from "../../DateRangeBottomSheet/YmdDate";

type Params = {
  region?: string | null;
  category?: string | null;
  sort?: string | null;
  status?: string | null;
  findStatus?: string | null;
  date?: string | null;
};

const formatStringDate = (date: YmdDate) => {
  const { year, month, day } = date;

  const m = String(month).padStart(2, "0");
  const d = String(day).padStart(2, "0");

  return `${year}-${m}-${d}`;
};

export const normalizedFilterValues = ({
  region,
  category,
  sort,
  status,
  findStatus,
  date,
}: Params) => {
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
    normalizedDate: date || null,
  };
};

export const filterSelectionState = ({
  region,
  category,
  sort,
  status,
  findStatus,
  date,
}: Params) => {
  const isRegionSelected = Boolean(region);
  const isCategorySelected = Boolean(category);
  const isSortSelected = Boolean(sort);
  const isStatusSelected = Boolean(status);
  const isFindStatusSelected = Boolean(findStatus);
  const isDateSelected = Boolean(date);

  return {
    isRegionSelected,
    isCategorySelected,
    isSortSelected,
    isStatusSelected,
    isFindStatusSelected,
    isDateSelected,
  };
};
