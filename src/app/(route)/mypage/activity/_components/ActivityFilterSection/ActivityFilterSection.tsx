"use client";

import { Filter } from "@/components/common";
import { useEffect, useState } from "react";
import { SelectBottomSheet } from "../../../_internal";
import { DateRangeBottomSheet } from "@/components/domain";
import { ACTIVITY_OPTIONS } from "../../_constants/ACTIVITY_OPTIONS";
import {
  ACTIVITY_DEFAULT_FILTERS,
  ActivityFilterState,
  ActivityFilterValue,
} from "../../_types/ActivityFilterType";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formatYmdLabel, parseYmd } from "@/utils/parseDateFilter/parseDateFilter";
import { normalizeEnumValue } from "@/utils";
import { normalizedFilterValues } from "@/components/domain/FilterSectionBottomSheet/utils/deriveFilterParams";
import { useFilterParams } from "@/hooks/domain";
import { ACTIVITY_DEFAULT_LABEL, ACTIVITY_LABEL_MAP } from "../../_constants/ACTIVITY_LABEL";

const ActivityFilterSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isBottomSheet, setIsBottomSheet] = useState<{
    isOpen: boolean;
    mode: "Date" | "Activity";
  }>({
    isOpen: false,
    mode: "Date",
  });

  const { date, activity } = useFilterParams();

  const [filters, setFilters] = useState<ActivityFilterState>({
    ...ACTIVITY_DEFAULT_FILTERS,
    date: date ?? "",
    activity: normalizeEnumValue<Exclude<ActivityFilterValue, undefined>>(activity),
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (filters.date) {
      params.set("date", filters.date);
    } else {
      params.delete("date");
    }

    if (filters.activity && filters.activity !== undefined) {
      params.set("activity", filters.activity);
    } else {
      params.delete("activity");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [filters, pathname, router, searchParams]);

  const dateObj = parseYmd(date);
  const dateLabel = dateObj ? formatYmdLabel(dateObj) : "기간";

  const { normalizedActivity } = normalizedFilterValues({ activity });

  return (
    <section className="flex w-full gap-2 px-5 py-[14px]">
      <h2 className="sr-only">필터링 영역</h2>

      <Filter
        name="date"
        ariaLabel="기간"
        icon={{ name: "Calendar", size: 16 }}
        iconPosition="leading"
        onSelected={!!date}
        onClick={() => setIsBottomSheet({ isOpen: true, mode: "Date" })}
      >
        {date ? dateLabel : "기간"}
      </Filter>

      <Filter
        name="activity"
        ariaLabel="활동 유형"
        icon={{ name: "ArrowDown", size: 16 }}
        iconPosition="trailing"
        onSelected={!!activity}
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
