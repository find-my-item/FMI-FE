"use client";

import { Filter, KebabMenu } from "@/components/common";
import { useState } from "react";
import { DateRangeBottomSheet } from "@/components/domain";
import { useFilterParams } from "@/hooks/domain";
import { applyFiltersToUrl, getDateRangeLabel, normalizeEnumValue } from "@/utils";
import {
  filterSelectionState,
  normalizedFilterValues,
} from "@/utils/deriveFilterParams/deriveFilterParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CommentFilterState } from "../../_types/commentFilterType";
import {
  COMMENT_DEFAULT_FILTERS,
  SIMPLE_SORT_LABEL_MAP,
  SORT_KEBAB_ITEM,
} from "../../_constants/COMMENT_FILTER";
import { SimpleSortType } from "@/types";

const MypageCommentsFilterSection = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [isFilterSheet, setIsFilterSheet] = useState<{
    isOpen: boolean;
    mode: "Date" | "Sort";
  }>({ isOpen: false, mode: "Date" });

  const { startDate, endDate, simpleSort } = useFilterParams();
  const { normalizedSimpleSort } = normalizedFilterValues({ simpleSort: simpleSort });
  const selectionState = filterSelectionState({ startDate, endDate, simpleSort });

  const dateLabel = getDateRangeLabel(startDate, endDate);

  const [filters, setFilters] = useState<CommentFilterState>({
    ...COMMENT_DEFAULT_FILTERS,
    startDate: startDate ?? "",
    endDate: endDate ?? "",
    simpleSort: normalizeEnumValue<SimpleSortType>(simpleSort) ?? "LATEST",
  });

  const kebabMenuItems = SORT_KEBAB_ITEM.map((item) => ({
    text: item.label,
    onClick: () => {
      setFilters((prev) => ({ ...prev, simpleSort: item.value }));

      setIsFilterSheet((prev) => ({ ...prev, isOpen: false }));
      const qs = applyFiltersToUrl({
        filters: filters,
        searchParams: new URLSearchParams(searchParams.toString()),
      });
      console.log("filter>> ", filters);
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    },
  }));

  return (
    <section className="flex w-full gap-2 px-5 py-[14px]" aria-label="필터 영역">
      <Filter
        name="date"
        ariaLabel="기간"
        icon={{ name: "Calendar", size: 16 }}
        iconPosition="leading"
        onSelected={selectionState.isDateSelected}
        onClick={() => setIsFilterSheet({ isOpen: true, mode: "Date" })}
      >
        {dateLabel}
      </Filter>

      <div className="relative">
        <Filter
          ariaLabel="정렬 필터"
          icon={{ name: "ArrowDown", size: 16 }}
          onSelected={selectionState.isSortSelected}
          onClick={() => setIsFilterSheet({ mode: "Sort", isOpen: true })}
          iconPosition="trailing"
        >
          {(normalizedSimpleSort && SIMPLE_SORT_LABEL_MAP[normalizedSimpleSort]) ?? "최신순"}
        </Filter>

        {isFilterSheet.mode === "Sort" && isFilterSheet.isOpen && (
          <div className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2">
            <KebabMenu items={kebabMenuItems} />
          </div>
        )}
      </div>

      {isFilterSheet.isOpen && isFilterSheet.mode === "Date" && (
        <DateRangeBottomSheet
          isOpen={isFilterSheet.isOpen}
          onClose={() => setIsFilterSheet((prev) => ({ ...prev, isOpen: false }))}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    </section>
  );
};

export default MypageCommentsFilterSection;
