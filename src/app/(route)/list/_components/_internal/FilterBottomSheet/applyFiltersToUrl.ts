import { FiltersState } from "../FilterSection/filtersStateType";
import { CategoryFilterValue, SortFilterValue, StatusFilterValue } from "./types";

const categoryToQueryValue = (category: CategoryFilterValue) => {
  if (!category) return "";

  const map: Record<CategoryFilterValue, string> = {
    "": "",
    ELECTRONICS: "electronics",
    WALLET: "wallet",
    ID_CARD: "id_card",
    JEWELRY: "jewelry",
    BAG: "bag",
    CARD: "card",
    ETC: "etc",
  };

  return map[category];
};

const sortToQueryValue = (sort: SortFilterValue) => {
  if (!sort) return "";

  const map: Record<SortFilterValue, string> = {
    "": "",
    OLDEST: "oldest",
    MOST_FAVORITED: "most_favorited",
    MOST_VIWED: "most_viewed",
  };

  return map[sort];
};

const statusToQueryValue = (status: StatusFilterValue) => {
  if (!status) return "";

  const map: Record<StatusFilterValue, string> = {
    "": "",
    FOUND: "found",
    SEARCHING: "searching",
  };

  return map[status];
};

type ApplyFiltersToUrlProps = {
  filters: FiltersState;
  searchParams: URLSearchParams;
};

export const applyFiltersToUrl = ({ filters, searchParams }: ApplyFiltersToUrlProps): string => {
  const params = new URLSearchParams(searchParams.toString());

  const upsert = (key: string, value: string) => {
    if (!value) params.delete(key);
    else params.set(key, value);
  };

  upsert("region", filters.region);
  upsert("category", categoryToQueryValue(filters.category));
  upsert("sort", sortToQueryValue(filters.sort));
  upsert("status", statusToQueryValue(filters.status));

  return params.toString();
};
