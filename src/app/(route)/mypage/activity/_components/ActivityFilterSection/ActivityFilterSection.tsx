"use client";

import { Filter } from "@/components/common";
import { useState } from "react";
import { DateRangeBottomSheet } from "@/components/domain";
import { ACTIVITY_OPTIONS } from "../../_constants/ACTIVITY_OPTIONS";
import { ActivityFilterState } from "../../_types/ActivityFilterType";
import { formatYmdLabel, parseYmd } from "@/utils/parseDateFilter/parseDateFilter";
import { normalizedFilterValues } from "@/components/domain/FilterSectionBottomSheet/utils/deriveFilterParams";
import { ACTIVITY_DEFAULT_LABEL, ACTIVITY_LABEL_MAP } from "../../_constants/ACTIVITY_LABEL";
import { useActivityFilter } from "../../_hooks/useActivityFilter";
import ActivityBottomSheet from "../ActivityBottomSheet/ActivityBottomSheet";

const ActivityFilterSection = () => {
  const { filters, setFilters, dateQuery, activityQuery } = useActivityFilter();

  const [isBottomSheet, setIsBottomSheet] = useState<{
    isOpen: boolean;
    mode: "Date" | "Activity";
  }>({ isOpen: false, mode: "Date" });

  const dateObj = parseYmd(dateQuery);
  const dateLabel = dateObj ? formatYmdLabel(dateObj) : "기간";

  const { normalizedActivity } = normalizedFilterValues({ activity: activityQuery });

  return (
    <section className="flex w-full gap-2 px-5 py-[14px]">
      <h2 className="sr-only">필터링 영역</h2>

      <Filter
        name="date"
        ariaLabel="기간"
        icon={{ name: "Calendar", size: 16 }}
        iconPosition="leading"
        onSelected={!!dateQuery}
        onClick={() => setIsBottomSheet({ isOpen: true, mode: "Date" })}
      >
        {dateQuery ? dateLabel : "기간"}
      </Filter>

      <Filter
        name="activity"
        ariaLabel="활동 유형"
        icon={{ name: "ArrowDown", size: 16 }}
        iconPosition="trailing"
        onSelected={!!activityQuery}
        onClick={() => setIsBottomSheet({ isOpen: true, mode: "Activity" })}
      >
        {(normalizedActivity && ACTIVITY_LABEL_MAP[normalizedActivity]) ?? ACTIVITY_DEFAULT_LABEL}
      </Filter>

      {isBottomSheet.isOpen && isBottomSheet.mode === "Date" && (
        <DateRangeBottomSheet<ActivityFilterState>
          isOpen={isBottomSheet.isOpen}
          onClose={() => setIsBottomSheet((prev) => ({ ...prev, isOpen: false }))}
          filters={filters}
          setFilters={setFilters}
        />
      )}

      {isBottomSheet.isOpen && isBottomSheet.mode === "Activity" && (
        <ActivityBottomSheet
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
