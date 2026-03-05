import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFilterParams } from "@/hooks/domain";
import { normalizeEnumValue } from "@/utils";
import {
  ACTIVITY_DEFAULT_FILTERS,
  ActivityFilterState,
  ActivityFilterValue,
} from "../_types/ActivityFilterType";

export const useActivityFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { date, activity } = useFilterParams();

  const [filters, setFilters] = useState<ActivityFilterState>({
    ...ACTIVITY_DEFAULT_FILTERS,
    date: date ?? "",
    activity: normalizeEnumValue<Exclude<ActivityFilterValue, undefined>>(activity),
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (filters.date) params.set("date", filters.date);
    else params.delete("date");

    if (filters.activity) params.set("activity", filters.activity);
    else params.delete("activity");

    router.push(`${pathname}?${params.toString()}`);
  }, [filters, pathname, router, searchParams]);

  return {
    filters,
    setFilters,
    dateQuery: date,
    activityQuery: activity,
  };
};
