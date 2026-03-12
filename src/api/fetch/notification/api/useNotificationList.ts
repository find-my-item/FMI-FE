import useAppQuery from "@/api/_base/query/useAppQuery";
import { NotificationListResponse } from "../types/notificationListType";

export const useNotificationList = () => {
  return useAppQuery<NotificationListResponse>("auth", ["notificationList"], "/notifications");
};
