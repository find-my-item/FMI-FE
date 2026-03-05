import { useState } from "react";
import { useFilterParams } from "@/hooks/domain";
import { normalizeEnumValue } from "@/utils";
import {
  ACTIVITY_DEFAULT_FILTERS,
  ActivityFilterState,
  ActivityFilterValue,
} from "../_types/ActivityFilterType";

export const useActivityFilter = () => {
  const { date, activity } = useFilterParams();

  const [filters, setFilters] = useState<ActivityFilterState>({
    ...ACTIVITY_DEFAULT_FILTERS,
    date: date ?? "",
    activity: normalizeEnumValue<Exclude<ActivityFilterValue, undefined>>(activity),
  });

  return {
    filters,
    setFilters,
    dateQuery: date,
    activityQuery: activity,
  };
};
