import { useState } from "react";
import { normalizeEnumValue } from "@/utils";
import { Filter } from "@/components/common";
import FilterBottomSheet from "../FilterBottomSheet/FilterBottomSheet";
import {
  CATEGORY_LABEL_MAP,
  FIND_STATUS_LABEL_MAP,
  SORT_LABEL_MAP,
  STATUS_LABEL_MAP,
} from "../_constants/LABELS";
import {
  CategoryFilterValue,
  FilterTab,
  SortFilterValue,
  StatusFilterValue,
} from "../_types/types";
import { FiltersStateType } from "../_types/filtersStateType";
import { DEFAULT_FILTERS } from "../_constants/DEFAULT_FILTERS";
import { filterSelectionState, normalizedFilterValues } from "../utils/deriveFilterParams";
import { useFilterParams } from "@/hooks/domain";
import { TABS } from "../_constants/TABS";

interface FilterSectionProps {
  pageType?: "LIST" | "MY_POSTS" | "MY_FAVORITES";
}

const FilterSection = ({ pageType = "LIST" }: FilterSectionProps) => {
  const { region, category, sort, status, findStatus } = useFilterParams();
  const [filters, setFilters] = useState<FiltersStateType>(DEFAULT_FILTERS);
  const [selectedTab, setSelectedTab] = useState<FilterTab>("region");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { normalizedCategory, normalizedSort, normalizedStatus, normalizedFindStatus } =
    normalizedFilterValues({ region, category, sort, status, findStatus });

  const selectionState = filterSelectionState({ region, category, sort, status, findStatus });

  const openSheet = (tab: FilterTab) => {
    setFilters({
      ...DEFAULT_FILTERS,
      region: region ?? "",
      category: normalizeEnumValue<Exclude<CategoryFilterValue, undefined>>(category),
      sort: normalizeEnumValue<SortFilterValue>(sort) ?? "LATEST",
      status: normalizeEnumValue<Exclude<StatusFilterValue, undefined>>(status),
    });
    setSelectedTab(tab);
    setIsFilterOpen(true);
  };

  // 각 필터별 렌더링 설정 맵
  const filterConfigs: Record<FilterTab, any> = {
    region: {
      ariaLabel: "지역 선택 필터",
      onSelected: selectionState.isRegionSelected,
      icon: { name: "Location", size: 16 },
      label: selectionState.isRegionSelected ? region : "지역 선택",
      iconPosition: "leading",
    },
    category: {
      ariaLabel: "카테고리 필터",
      onSelected: selectionState.isCategorySelected,
      icon: { name: "ArrowDown", size: 12 },
      label: (normalizedCategory && CATEGORY_LABEL_MAP[normalizedCategory]) ?? "카테고리",
      iconPosition: "trailing",
    },
    sort: {
      ariaLabel: "정렬 필터",
      onSelected: selectionState.isSortSelected,
      icon: { name: "ArrowDown", size: 12 },
      label: (normalizedSort && SORT_LABEL_MAP[normalizedSort]) ?? "최신순",
      iconPosition: "trailing",
    },
    findStatus: {
      ariaLabel: "찾음여부 필터",
      onSelected: selectionState.isFindStatusSelected,
      icon: { name: "ArrowDown", size: 12 },
      label: (normalizedFindStatus && FIND_STATUS_LABEL_MAP[normalizedFindStatus]) ?? "전체",
      iconPosition: "trailing",
    },
    status: {
      ariaLabel: "분류 필터",
      onSelected: selectionState.isStatusSelected,
      icon: { name: "ArrowDown", size: 12 },
      label: (normalizedStatus && STATUS_LABEL_MAP[normalizedStatus]) ?? "분류",
      iconPosition: "trailing",
    },
  };

  return (
    <>
      <section
        aria-label="필터 영역"
        className="flex h-[67px] w-full items-center gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap px-5 no-scrollbar"
      >
        {TABS[pageType].map((tab) => {
          const config = filterConfigs[tab.value as FilterTab];
          if (!config) return null;

          return (
            <Filter
              key={tab.value}
              ariaLabel={config.ariaLabel}
              onSelected={config.onSelected}
              icon={config.icon}
              iconPosition={config.iconPosition}
              className="flex-shrink-0"
              onClick={() => openSheet(tab.value as FilterTab)}
            >
              {config.label}
            </Filter>
          );
        })}
      </section>

      {isFilterOpen && (
        <FilterBottomSheet
          isOpen={isFilterOpen}
          setIsOpen={setIsFilterOpen}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          filters={filters}
          setFilters={setFilters}
          pageType={pageType}
        />
      )}
    </>
  );
};

// const FilterSection = ({ pageType = "LIST" }: FilterSectionProps) => {
//   const { region, category, sort, status, findStatus } = useFilterParams();

//   const [filters, setFilters] = useState<FiltersStateType>(DEFAULT_FILTERS);

//   const { normalizedCategory, normalizedSort, normalizedStatus, normalizedFindStatus } =
//     normalizedFilterValues({
//       region,
//       category,
//       sort,
//       status,
//       findStatus,
//     });

//   const {
//     isRegionSelected,
//     isCategorySelected,
//     isSortSelected,
//     isStatusSelected,
//     isFindStatusSelected,
//   } = filterSelectionState({
//     region,
//     category,
//     sort,
//     status,
//     findStatus,
//   });

//   const categoryLabel =
//     (normalizedCategory && CATEGORY_LABEL_MAP[normalizedCategory]) ?? "카테고리";
//   const sortLabel = (normalizedSort && SORT_LABEL_MAP[normalizedSort]) ?? "최신순";
//   const statusLabel = (normalizedStatus && STATUS_LABEL_MAP[normalizedStatus]) ?? "전체";
//   const findStatusLabel =
//     (normalizedFindStatus && FIND_STATUS_LABEL_MAP[normalizedFindStatus]) ?? "전체";

//   const [selectedTab, setSelectedTab] = useState<FilterTab>("region");
//   const [isOpen, setIsOpen] = useState(false);

//   const openSheet = (tab: FilterTab) => {
//     setFilters({
//       ...DEFAULT_FILTERS,
//       region: region ?? "",
//       category: normalizeEnumValue<Exclude<CategoryFilterValue, undefined>>(category),
//       sort: normalizeEnumValue<SortFilterValue>(sort) ?? "LATEST",
//       status: normalizeEnumValue<Exclude<StatusFilterValue, undefined>>(status),
//     });

//     setSelectedTab(tab);
//     setIsOpen(true);
//   };

//   return (
//     <>
//       <section
//         aria-label="필터 영역"
//         className="flex h-[67px] w-full items-center gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap px-5 no-scrollbar"
//       >
//         <Filter
//           ariaLabel="지역 선택 필터"
//           onSelected={isRegionSelected}
//           icon={{ name: "Location", size: 16 }}
//           className="flex-shrink-0"
//           onClick={() => openSheet("region")}
//         >
//           {isRegionSelected ? region : "지역 선택"}
//         </Filter>

//         <Filter
//           ariaLabel="카테고리 필터"
//           onSelected={isCategorySelected}
//           iconPosition="trailing"
//           icon={{ name: "ArrowDown", size: 12 }}
//           className="flex-shrink-0"
//           onClick={() => openSheet("category")}
//         >
//           {categoryLabel}
//         </Filter>

//         <Filter
//           ariaLabel="정렬 필터"
//           onSelected={isSortSelected}
//           iconPosition="trailing"
//           icon={{ name: "ArrowDown", size: 12 }}
//           className="flex-shrink-0"
//           onClick={() => openSheet("sort")}
//         >
//           {sortLabel}
//         </Filter>

//         <Filter
//           ariaLabel="찾음여부 필터"
//           onSelected={isFindStatusSelected}
//           iconPosition="trailing"
//           icon={{ name: "ArrowDown", size: 12 }}
//           className="flex-shrink-0"
//           onClick={() => openSheet("findStatus")}
//         >
//           {findStatusLabel}
//         </Filter>

//         <Filter
//           ariaLabel="분류 필터"
//           onSelected={isStatusSelected}
//           iconPosition="trailing"
//           icon={{ name: "ArrowDown", size: 12 }}
//           className="flex-shrink-0"
//           onClick={() => openSheet("status")}
//         >
//           {statusLabel}
//         </Filter>
//       </section>

//       {isOpen && (
//         <FilterBottomSheet
//           isOpen={isOpen}
//           setIsOpen={setIsOpen}
//           selectedTab={selectedTab}
//           setSelectedTab={setSelectedTab}
//           filters={filters}
//           setFilters={setFilters}
//         />
//       )}
//     </>
//   );
// };

export default FilterSection;
