"use client";

import { Filter, KebabMenu } from "@/components/common";
import { useState } from "react";
import { DateRangeBottomSheet } from "@/components/domain";
import { useFilterParams } from "@/hooks/domain";
import { formatYmdLabel, getDateRangeLabel, parseYmd } from "@/utils";
import {
  filterSelectionState,
  normalizedFilterValues,
} from "@/components/domain/FilterSectionBottomSheet/utils/deriveFilterParams";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface ActivityFilterState {
  startDate: string;
  endDate: string;
  sort: "";
}

// { label: "최신순", value: "LATEST" },
// { label: "오래된순", value: "OLDEST" },

export const COMMENT_DEFAULT_FILTERS: ActivityFilterState = {
  startDate: "",
  endDate: "",
  sort: undefined,
};

const SORT_LABEL_MAP = [{ LATEST: "최신순" }, { OLDEST: "오래된 순" }];

const MypageCommentsFilter = () => {
  const [isFilterSheet, setIsFilterSheet] = useState<{
    isOpen: boolean;
    mode: "Date" | "Sort";
  }>({ isOpen: false, mode: "Date" });

  const kebabMenuItems = SORT_LABEL_MAP.map((item) => ({
    text: item,
    // onClick: () => {
    //   const searchParams = useSearchParams();
    //   const pathname = usePathname();
    //   const router = useRouter();
    // },
  }));

  const { startDate, endDate, sort } = useFilterParams();
  const { normalizedSort } = normalizedFilterValues({ sort: sort });
  const selectionState = filterSelectionState({ startDate, endDate, sort });

  const dateLabel = getDateRangeLabel(startDate, endDate);

  const [filters, setFilters] = useState<CommentFilterState>({
    ...SORT_DEFAULT_LABEL,
    date: date ?? "",
    activity: normalizeEnumValue<Exclude<CommentFilterState, undefined>>(activity),
  });

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
          {(normalizedSort && SORT_LABEL_MAP[normalizedSort]) ?? "최신순"}
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
          filters={}
          setFilters={}
        />
      )}
    </section>
  );
};

export default MypageCommentsFilter;
