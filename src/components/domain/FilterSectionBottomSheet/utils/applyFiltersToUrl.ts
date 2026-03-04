/**
 * @author jikwon
 *
 * 필터 상태 객체를 URL 쿼리 스트링으로 변환하기 위한 매핑 정보와 변환 함수들을 포함하는 유틸리티입니다.
 * 내부에 정의된 각 MAP 객체는 클라이언트의 상태 값(Enum/Type)을 URL에 적합한 문자열로 매핑합니다.
 */

import {
  ActivityFilterState,
  ActivityFilterValue,
} from "@/app/(route)/mypage/activity/_types/ActivityFilterType";
import { FiltersStateType } from "../_types/filtersStateType";
import {
  CategoryFilterValue,
  FindStatusFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "../_types/types";
import { CategoryType, ItemStatus, PostType } from "@/types";
import { ActivityType } from "@/app/(route)/mypage/activity/_types/ActivityType";

const CATEGORY_QUERY_VALUE_MAP: Record<CategoryType, string> = {
  ELECTRONICS: "electronics",
  WALLET: "wallet",
  ID_CARD: "id_card",
  JEWELRY: "jewelry",
  BAG: "bag",
  CARD: "card",
  ETC: "etc",
};

const SORT_QUERY_VALUE_MAP: Record<SortFilterValue, string> = {
  LATEST: "latest",
  OLDEST: "oldest",
  MOST_FAVORITED: "most_favorited",
  MOST_VIEWED: "most_viewed",
};

const FIND_STATUS_QUERY_VALUE_MAP: Record<ItemStatus, string> = {
  FOUND: "found",
  SEARCHING: "searching",
};

const STATUS_QUERY_VALUE_MAP: Record<PostType, string> = {
  LOST: "lost",
  FOUND: "found",
};

const categoryToQueryValue = (category: CategoryFilterValue): string | undefined => {
  if (!category) return undefined;
  return CATEGORY_QUERY_VALUE_MAP[category];
};

const sortToQueryValue = (sort: SortFilterValue): string => {
  return SORT_QUERY_VALUE_MAP[sort];
};

const findStatusToQueryValue = (findStatus: FindStatusFilterValue): string | undefined => {
  if (!findStatus) return undefined;
  return FIND_STATUS_QUERY_VALUE_MAP[findStatus];
};

const statusToQueryValue = (status: StatusFilterValue): string | undefined => {
  if (!status) return undefined;
  return STATUS_QUERY_VALUE_MAP[status];
};

const ACTIVITY_QUERY_VALUE_MAP: Record<ActivityType, string> = {
  POST: "post",
  COMMENT: "comment",
  AUTHENTICATION: "authentication",
  FAVORITE: "favorite",
  INQUIRY: "inquiry",
  REPORT: "report",
};

const activityToQueryValue = (activity: ActivityFilterValue): string | undefined => {
  if (!activity) return undefined;
  return ACTIVITY_QUERY_VALUE_MAP[activity];
};

type ApplyFiltersToUrlProps = {
  filters: Partial<FiltersStateType & ActivityFilterState>;
  searchParams: URLSearchParams;
};

export const applyFiltersToUrl = ({ filters, searchParams }: ApplyFiltersToUrlProps): string => {
  const params = new URLSearchParams(searchParams.toString());

  const upsert = (key: string, value?: string) => {
    if (!value) params.delete(key);
    else params.set(key, value);
  };

  if ("region" in filters) upsert("region", filters.region);
  if ("category" in filters) upsert("category", categoryToQueryValue(filters.category));
  if ("sort" in filters) upsert("sort", filters.sort ? sortToQueryValue(filters.sort) : undefined);
  if ("status" in filters) upsert("status", statusToQueryValue(filters.status));
  if ("findStatus" in filters) upsert("findStatus", findStatusToQueryValue(filters.findStatus));
  if ("activity" in filters) upsert("activity", activityToQueryValue(filters.activity));
  if ("date" in filters) upsert("date", filters.date);

  return params.toString();
};
