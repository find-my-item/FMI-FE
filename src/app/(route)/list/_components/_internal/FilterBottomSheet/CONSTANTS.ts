import { CategoryFilterValue, StatusFilterValue } from "@/types";
import { FilterTab } from "../FilterSection/FilterSection";

export const tabs: { label: string; value: FilterTab }[] = [
  { label: "지역", value: "region" },
  { label: "카테고리", value: "category" },
  { label: "정렬", value: "sort" },
  { label: "찾음여부", value: "status" },
];

export const categories: { label: string; value: CategoryFilterValue }[] = [
  { label: "전체", value: "" },
  { label: "전자기기", value: "ELECTRONICS" },
  { label: "지갑", value: "WALLET" },
  { label: "신분증", value: "ID_CARD" },
  { label: "귀금속", value: "JEWELRY" },
  { label: "가방", value: "BAG" },
  { label: "카드", value: "CARD" },
  { label: "기타", value: "ETC" },
];

export const sort = [
  { label: "최신순", value: "latest" },
  { label: "오래된 순", value: "oldest" },
  { label: "즐겨찾기 많은 순", value: "mostFavorite" },
  { label: "조회수 많은 순", value: "mostViews" },
];

export const status: { label: string; value: StatusFilterValue }[] = [
  { label: "전체", value: "" },
  { label: "찾는중", value: "SEARCHING" },
  { label: "찾았음", value: "FOUND" },
];
