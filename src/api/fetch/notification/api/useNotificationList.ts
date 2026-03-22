import { InfiniteData } from "@tanstack/react-query";
import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { NotificationListResponse, NotificationListItem } from "../types/notificationListType";
import { useSearchParams } from "next/navigation";
import { useNotificationStore } from "@/store";
import { useEffect } from "react";

const useNotificationList = () => {
  const searchParams = useSearchParams();
  const setHasUnreadNotification = useNotificationStore((state) => state.setHasUnreadNotification);
  const categoryParam = searchParams.get("category");
  const category = categoryParam && categoryParam !== "all" ? categoryParam : undefined;

  const url = category
    ? `/notifications?notificationType=${encodeURIComponent(category)}`
    : "/notifications";

  const query = useAppInfiniteQuery<NotificationListResponse, unknown, NotificationListItem[]>(
    "auth",
    ["notificationList", category ?? "all"],
    url,
    {
      getNextPageParam: (lastPage) =>
        lastPage.result.hasNext ? lastPage.result.nextCursor : undefined,
      select: (data: InfiniteData<NotificationListResponse>) =>
        data.pages.flatMap((page) => page.result.content),
    }
  );

  useEffect(() => {
    if (!query.data) return;
    const hasUnreadNotification = query.data.some((notification) => !notification.isRead);
    setHasUnreadNotification(hasUnreadNotification);
  }, [query.data, setHasUnreadNotification]);

  return query;
};

export default useNotificationList;
