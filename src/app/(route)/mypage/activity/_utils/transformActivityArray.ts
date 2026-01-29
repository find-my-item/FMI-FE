import { ActivityDataType, ActivityGroupType } from "../_types/ActivityType";

const transformActivityArray = (
  activityArray: readonly ActivityDataType[]
): ActivityGroupType[] => {
  if (!activityArray) return [];

  const dateString = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const groups: Record<string, ActivityDataType[]> = {};

  activityArray.forEach((activity) => {
    const dateKey = dateString(activity.createdAt);

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
