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
import { SimpleSortType } from "@/types";
import { CommentFilterState, SimpleSortFilterValue } from "../../_types/commentFilterType";

const COMMENT_DEFAULT_FILTERS: CommentFilterState = {
  startDate: "",
  endDate: "",
  simpleSort: undefined,
};

const SIMPLE_SORT_LABEL_MAP: Record<SimpleSortType, string> = {
  LATEST: "최신순",
  OLDEST: "오래된순",
};

const MypageCommentsFilter = () => {
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
    simpleSort: normalizeEnumValue<Exclude<SimpleSortFilterValue, undefined>>(simpleSort),
  });

  const SORT_KEBAB_ITEM: { label: "최신순" | "오래된순"; value: SimpleSortType }[] = [
    { label: "최신순", value: "LATEST" },
    { label: "오래된순", value: "OLDEST" },
  ];
  const kebabMenuItems = SORT_KEBAB_ITEM.map((item) => ({
    text: item.label,
    onClick: () => {
      setFilters((prev) => ({ ...prev, simpleSort: item.value }));

      const qs = applyFiltersToUrl({
        filters,
        searchParams: new URLSearchParams(searchParams.toString()),
      });

      router.replace(qs ? `${pathname}?${qs}` : pathname);
    },
  }));

  return (
    <section className="flex w-full gap-2 px-5 py-[14px]">
      <h2 className="sr-only">필터링 영역</h2>

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
          onClick={() => setIsFilterSheet((prev) => ({ ...prev, open: true }))}
          iconPosition="trailing"
        >
          {(normalizedSimpleSort && SIMPLE_SORT_LABEL_MAP[normalizedSimpleSort]) ?? "최신순"}
          최신순
        </Filter>

        {isFilterSheet.isOpen && isFilterSheet.mode === "Sort" && (
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

export default MypageCommentsFilter;
