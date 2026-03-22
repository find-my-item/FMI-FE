"use client";

import { Icon } from "@/components/common";
import { cn, formatDate } from "@/utils";
import {
  NotificationListItem,
  useNotificationList,
  useNotificationRead,
} from "@/api/fetch/notification";
import { useInfiniteScroll } from "@/hooks";
import { getAlertIconBackgroundColor } from "./_internal/AlertViewMappers";
import { getAlertTitleSegments } from "./_internal/alertTitleSegments";
import { IconName } from "@/components/common/Icon/Icon";
import { EmptyState } from "@/components/state";
import { alertRouteUrl } from "./_internal/alertRouteUrl";
import { useRouter } from "next/navigation";

const AlertItem = ({ item }: { item: NotificationListItem }) => {
  const router = useRouter();
  const { notificationId, type, title, message, referenceType, referenceId, isRead, createdAt } =
    item;
  const { mutate: readNotification } = useNotificationRead();
  const { icon, bg } = getAlertIconBackgroundColor(type, referenceType);
  const titleSegments = getAlertTitleSegments(type, title);
  const IconSize = referenceType === "NOTICE" ? 20 : 15;

  const handleAlertRoute = () => {
    readNotification({ ids: [notificationId] });
    router.push(alertRouteUrl(referenceType, referenceId));
  };

  return (
    <button
      onClick={handleAlertRoute}
      aria-label="알림 확인, 외부 페이지 이동"
      key={notificationId}
      className={cn(
        "flex min-h-[86px] w-full cursor-pointer gap-3 border-b border-divider-default p-5 text-left transition-colors hover:bg-fill-flatGray-25",
        isRead ? "bg-white" : "bg-fill-brand-subtle-default_3 hover:bg-fill-brand-subtle-default_2"
      )}
    >
      <div className={cn("h-[30px] w-[30px] flex-shrink-0 rounded-full flex-center", bg)}>
        <Icon name={icon as IconName} size={IconSize} />
      </div>
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-body2-medium text-neutral-normal-default">
            {titleSegments.map((seg, i) => (
              <span key={i} className={cn(seg.emphasize && "text-brand-normal-default")}>
                {seg.text}
              </span>
            ))}
          </div>
          <span className="text-caption1-regular text-neutral-normal-placeholder">
            {formatDate(createdAt)}
          </span>
        </div>
        <span className="line-clamp-1 text-body2-regular text-neutral-strong-default">
          {message}
        </span>
      </div>
    </button>
  );
};

const AlertView = () => {
  const {
    data: notifications,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useNotificationList();
  const { ref: alertListRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  if (notifications?.length === 0) {
    return (
      <EmptyState
        icon={{ iconName: "AlertBell", iconSize: 70 }}
        title="아직 새 소식이 없어요"
        description={`주변을 계속 살펴보고 있어요.\n새로운 알림이 생기면 바로 알려드릴게요.`}
      />
    );
  }

  return (
    <>
      {notifications?.map((item) => (
        <AlertItem key={item.notificationId} item={item} />
      ))}
      {hasNextPage && <div ref={alertListRef} className="h-[100px]" />}
    </>
  );
};

export default AlertView;
