import { InfiniteData } from "@tanstack/react-query";
import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { NotificationListResponse, NotificationListItem } from "../types/notificationListType";

export const useNotificationList = () => {
  return useAppInfiniteQuery<NotificationListResponse, unknown, NotificationListItem[]>(
    "auth",
    ["notificationList"],
    "/notifications",
    {
      getNextPageParam: (lastPage) =>
        lastPage.result.hasNext ? lastPage.result.nextCursor : undefined,
      select: (data: InfiniteData<NotificationListResponse>) =>
        data.pages.flatMap((page) => page.result.content),
    }
  );
};
