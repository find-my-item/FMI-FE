export type ActivityStateType = {
  date: string;
  activityType?: string;
};

export const DEFAULT_ACTIVITY_FILTERS: ActivityStateType = {
  date: "",
  activityType: undefined,
};
