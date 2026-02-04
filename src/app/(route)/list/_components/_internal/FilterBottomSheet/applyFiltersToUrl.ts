import { FiltersState } from "../FilterSection/filtersStateType";
import { CategoryFilterValue, SortFilterValue, StatusFilterValue } from "./types";
import { CategoryType, ItemStatus } from "@/types";

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

const STATUS_QUERY_VALUE_MAP: Record<ItemStatus, string> = {
  FOUND: "found",
  SEARCHING: "searching",
};

const categoryToQueryValue = (category: CategoryFilterValue): string | undefined => {
  if (!category) return undefined;
  return CATEGORY_QUERY_VALUE_MAP[category];
};

const sortToQueryValue = (sort: SortFilterValue): string => {
  return SORT_QUERY_VALUE_MAP[sort];
};

const statusToQueryValue = (status: StatusFilterValue): string | undefined => {
  if (!status) return undefined;
  return STATUS_QUERY_VALUE_MAP[status];
};

type ApplyFiltersToUrlProps = {
  filters: FiltersState;
  searchParams: URLSearchParams;
};

export const applyFiltersToUrl = ({ filters, searchParams }: ApplyFiltersToUrlProps): string => {
  const params = new URLSearchParams(searchParams.toString());

  const upsert = (key: string, value?: string) => {
    if (!value) params.delete(key);
    else params.set(key, value);
  };

  upsert("region", filters.region);
  upsert("category", categoryToQueryValue(filters.category));
  upsert("sort", sortToQueryValue(filters.sort));
  upsert("status", statusToQueryValue(filters.status));

  return params.toString();
};
