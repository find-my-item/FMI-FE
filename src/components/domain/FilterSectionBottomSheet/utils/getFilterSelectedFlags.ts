import { FiltersStateType } from "../_types/filtersStateType";

/**
 * @author jikwon
 *
 * 현재 필터 상태(FiltersStateType)를 기반으로 각 필터가 '활성화' 되었는지 판별합니다.
 * 기본값(빈 문자열, undefined, LATEST)에서 변경된 상태일 때만 true를 반환합니다.
 * 주로 UI에서 필터 칩의 하이라이트(강조) 여부를 결정할 때 사용됩니다.
 *
 * @param filters - 현재 관리되고 있는 전체 필터 상태 객체
 *
 */

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
