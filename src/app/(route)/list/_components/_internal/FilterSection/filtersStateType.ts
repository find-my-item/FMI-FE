import { CategoryFilterValue, StatusFilterValue } from "@/types";

export type FiltersState = {
  region: string;
  category: CategoryFilterValue;
  sort: string; // TODO(지권): 정렬 API 누락
  status: StatusFilterValue;
};
