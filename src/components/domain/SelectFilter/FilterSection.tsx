import { useState } from "react";
import { normalizeEnumValue } from "@/utils";
import { Filter } from "@/components/common";
import { useListParams } from "@/app/(route)/list/_hooks/useListParams/useListParams";
import { FiltersState } from "@/app/(route)/list/_components/_internal/FilterSection/filtersStateType";
import { DEFAULT_FILTERS } from "@/app/(route)/list/_components/_internal/FilterSection/DEFAULT_FILTERS";
import { filterSelectionState } from "@/app/(route)/list/_utils/deriveFilterParams/deriveFilterParams";
import { CATEGORY_LABEL_MAP } from "@/app/(route)/list/_components/_internal/FilterBottomSheet/LABELS";

const FilterSection = () => {
  const { region, category, sort, status } = useListParams();

  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);

  const { normalizedCategory, normalizedSort, normalizedStatus } = normalizedFilterValues({
    region,
    category,
    sort,
    status,
  });

  const { isRegionSelected, isCategorySelected, isSortSelected, isStatusSelected } =
    filterSelectionState({
      region,
      category,
      sort,
      status,
    });

  const categoryLabel =
    (normalizedCategory && CATEGORY_LABEL_MAP[normalizedCategory]) ?? "카테고리";
  const sortLabel = (normalizedSort && SORT_LABEL_MAP[normalizedSort]) ?? "최신순";
  const statusLabel = (normalizedStatus && STATUS_LABEL_MAP[normalizedStatus]) ?? "전체";

  const [selectedTab, setSelectedTab] = useState<FilterTab>("region");
  const [isOpen, setIsOpen] = useState(false);

  const openSheet = (tab: FilterTab) => {
    setFilters({
      ...DEFAULT_FILTERS,
      region: region ?? "",
      category: (normalizeEnumValue<CategoryFilterValue>(category) ?? "") as CategoryFilterValue,
      sort: (normalizeEnumValue<SortFilterValue>(sort) ?? "") as SortFilterValue,
      status: (normalizeEnumValue<StatusFilterValue>(status) ?? "") as StatusFilterValue,
    });

    setSelectedTab(tab);
    setIsOpen(true);
  };

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
          {isRegionSelected ? region : "지역 선택"}
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
