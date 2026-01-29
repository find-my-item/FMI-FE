import { formatDate } from "@/utils";
import { ActivityItemType } from "../_types/ActivityType";

const transformActivityArray = (activityArray: readonly ActivityItemType[]) => {
  const groups: Record<string, ActivityItemType[]> = {};

  activityArray.forEach((activity) => {
    const dateKey = formatDate(activity.createdAt);

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push({ ...activity });
  });

  return Object.keys(groups).map((date, index) => ({
    groupId: index,
    groupDate: date,
    activityItem: groups[date],
  }));
};

export default transformActivityArray;
