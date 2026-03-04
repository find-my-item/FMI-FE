import { ActivityType } from "./ActivityType";

export type ActivityFilterValue = ActivityType | undefined;

export interface ActivityFilterState {
  date: string;
  activity: ActivityFilterValue;
}

export const ACTIVITY_DEFAULT_FILTERS: ActivityFilterState = {
  date: "",
  activity: undefined,
};
