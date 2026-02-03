import { FiltersStateType } from "../_types/filtersStateType";
import {
  CategoryFilterValue,
  FindStatusFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "../_types/FilterType";

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
    MOST_FAVORITE: "most_favorite",
    MOST_VIEWED: "most_viewed",
  };

  return map[sort];
};

const findStatusToQueryValue = (findStatus: FindStatusFilterValue) => {
  if (!findStatus) return "";

  const map: Record<FindStatusFilterValue, string> = {
    "": "",
    FOUND: "found",
    SEARCHING: "searching",
  };

  return map[findStatus];
};

const statusToQueryValue = (status: StatusFilterValue) => {
  if (!status) return "";

  const map: Record<StatusFilterValue, string> = {
    "": "",
    LOST: "lost",
    FOUND: "found",
  };

  return map[status];
};

type ApplyFiltersToUrlProps = {
  filters: FiltersStateType;
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
  upsert("findStatus", findStatusToQueryValue(filters.findStatus));
  upsert("status", statusToQueryValue(filters.status));

  return params.toString();
};
