import { CategoryFilterValue, StatusFilterValue } from "@/types";
import { FiltersState } from "../FilterSection/filtersStateType";

const categoryToQueryValue = (category: CategoryFilterValue) => {
  if (!category) return "";

  const map: Record<CategoryFilterValue, string> = {
    "": "",
    ELECTRONICS: "electronics",
    WALLET: "wallet",
    ID_CARD: "id-card",
    JEWELRY: "jewelry",
    BAG: "bag",
    CARD: "card",
    ETC: "etc",
  };

  return map[category];
};

// TODO(지권): 누락된 API 수정 후 주석 해제
// const itemStatusToQueryValue = (itemStatus: string) => {
//   if (!itemStatus) return "";

//   const map: Record<string, string> = {
//     "": "",
//     LOST: "lost",
//     FOUND: "found",
//   };

//   return map[itemStatus];
// };

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
  upsert("sort", filters.sort);
  upsert("status", statusToQueryValue(filters.status));

  return params.toString();
};
