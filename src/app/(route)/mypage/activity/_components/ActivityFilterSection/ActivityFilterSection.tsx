"use client";

import { Filter } from "@/components/common";
import { useState } from "react";
import { ACTIVITY_FILTER } from "../../_constants/ACTIVITY_FILTER";
import { BottomSheetModeType, SelectBottomSheet } from "../../../_internal";
import { DateRangeBottomSheet } from "@/components/domain";
import { ACTIVITY_OPTIONS } from "../../_constants/ACTIVITY_OPTIONS";
import { ACTIVITY_DEFAULT_FILTERS, ActivityFilterState } from "../../_types/ActivityFilterType";

const ActivityFilterSection = () => {
  const [isBottomSheet, setIsBottomSheet] = useState<{
    isOpen: boolean;
    mode: BottomSheetModeType;
  }>({
    isOpen: false,
    mode: "Date",
  });

  const [filters, setFilters] = useState<ActivityFilterState>(ACTIVITY_DEFAULT_FILTERS);

  return (
    <section className="flex w-full gap-2 px-5 py-[14px]">
      <h2 className="sr-only">필터링 영역</h2>
      {ACTIVITY_FILTER.map((item) => (
        <Filter
          key={item.name}
          ariaLabel={item.label}
          icon={item.icon}
          onSelected={false}
          onClick={() => setIsBottomSheet({ isOpen: true, mode: item.name })}
          iconPosition={item.iconPosition}
        >
          {item.label}
        </Filter>
      ))}

      {isBottomSheet.isOpen && isBottomSheet.mode === "Date" && (
        <DateRangeBottomSheet<ActivityFilterState>
          isOpen={isBottomSheet.isOpen}
          onClose={() => setIsBottomSheet((prev) => ({ ...prev, isOpen: false }))}
          filters={filters}
          setFilters={setFilters}
        />
      )}

      {isBottomSheet.isOpen && isBottomSheet.mode === "Filter" && (
        <SelectBottomSheet
          isOpen={isBottomSheet.isOpen}
          onClose={() => setIsBottomSheet((prev) => ({ ...prev, isOpen: false }))}
          title="필터"
          option={ACTIVITY_OPTIONS}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    </section>
  );
};

export default ActivityFilterSection;
