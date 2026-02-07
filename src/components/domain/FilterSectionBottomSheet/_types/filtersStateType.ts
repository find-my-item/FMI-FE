/**
 * @author jikwon
 *
 *  필터 바텀시트에서 관리하는 전체 필터 상태 객체의 타입 정의입니다.
 * 사용자가 선택한 지역, 카테고리, 정렬 기준 및 게시글/물건의 상태 값을 포함합니다.
 */

import {
  CategoryFilterValue,
  FindStatusFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "./types";

export type FiltersStateType = {
  region: string;
  category: CategoryFilterValue;
  sort: SortFilterValue;
  status: StatusFilterValue;
  findStatus: FindStatusFilterValue;
};
