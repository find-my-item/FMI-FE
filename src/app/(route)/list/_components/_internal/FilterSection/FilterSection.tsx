import { useState } from "react";
import { Filter } from "@/components/common";
import { CATEGORY_LABEL_MAP, SORT_LABEL_MAP, STATUS_LABEL_MAP } from "../FilterBottomSheet/LABELS";
import {
  CategoryFilterValue,
  FilterTab,
  SortFilterValue,
  StatusFilterValue,
} from "../FilterBottomSheet/types";
import { FiltersState } from "./filtersStateType";
import { getFilterSelectedFlags } from "./getFilterSelectedFlags";
import FilterBottomSheet from "../FilterBottomSheet/FilterBottomSheet";

const FilterSection = () => {
  const [filters, setFilters] = useState<FiltersState>({
    region: "",
    category: "" as CategoryFilterValue,
    sort: "" as SortFilterValue,
    status: "" as StatusFilterValue,
  });

  const [selectedTab, setSelectedTab] = useState<FilterTab>("region");
  const [isOpen, setIsOpen] = useState(false);

  const openSheet = (tab: FilterTab) => {
    setSelectedTab(tab);
    setIsOpen(true);
  };

  const { isRegionSelected, isCategorySelected, isSortSelected, isStatusSelected } =
    getFilterSelectedFlags(filters);

  const categoryLabel = CATEGORY_LABEL_MAP[filters.category as CategoryFilterValue] ?? "카테고리";
  const sortLabel = SORT_LABEL_MAP[filters.sort as SortFilterValue] ?? "최신순";
  const statusLabel = STATUS_LABEL_MAP[filters.status as StatusFilterValue] ?? "전체";

  return (
    <>
      <section
        aria-label="필터 영역"
        className="flex h-[67px] w-full items-center gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap px-5 no-scrollbar"
      >
        <Filter
          ariaLabel="지역 선택 필터"
          onSelected={isRegionSelected}
          icon={{ name: "Location", size: 16 }}
          className="flex-shrink-0"
          onClick={() => openSheet("region")}
        >
          {isRegionSelected ? filters.region : "지역 선택"}
        </Filter>

        <Filter
          ariaLabel="카테고리 필터"
          onSelected={isCategorySelected}
          iconPosition="trailing"
          icon={{ name: "ArrowDown", size: 12 }}
          className="flex-shrink-0"
          onClick={() => openSheet("category")}
        >
          {categoryLabel}
        </Filter>

        <Filter
          ariaLabel="정렬 필터"
          onSelected={isSortSelected}
          iconPosition="trailing"
          icon={{ name: "ArrowDown", size: 12 }}
          className="flex-shrink-0"
          onClick={() => openSheet("sort")}
        >
          {sortLabel}
        </Filter>

        <Filter
          ariaLabel="찾음여부 필터"
          onSelected={isStatusSelected}
          iconPosition="trailing"
          icon={{ name: "ArrowDown", size: 12 }}
          className="flex-shrink-0"
          onClick={() => openSheet("status")}
        >
          {statusLabel}
        </Filter>
      </section>

      {isOpen && (
        <FilterBottomSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    </>
  );
};

export default FilterSection;
