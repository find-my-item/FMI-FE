import {
  CategoryFilterValue,
  FindStatusFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "./types";

export type FiltersStateType = {
  region: string;
  category: CategoryFilterValue;
  sort: SortFilterValue; // 정렬 (최신 순, 오래된 순, 조회 순)
  status: StatusFilterValue; // 분류 (분실, 습득)
  findStatus: FindStatusFilterValue; // 찾음 여부 (찾음, 찾는 중)
};
