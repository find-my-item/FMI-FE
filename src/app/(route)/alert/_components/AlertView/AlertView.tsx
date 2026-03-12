"use client";

import { Icon } from "@/components/common";
import { cn, formatDate } from "@/utils";
import Link from "next/link";
import { useNotificationList } from "@/api/fetch/notification/api/useNotificationList";
import { NotificationListItem } from "@/api/fetch/notification";
import { useInfiniteScroll } from "@/hooks";
import {
  getAlertIconBackgroundColor,
  getAlertTitle,
  renderTitle,
} from "./_internal/alertViewMapper";
import { IconName } from "@/components/common/Icon/Icon";
import { EmptyState } from "@/components/state";

const AlertItem = ({ item }: { item: NotificationListItem }) => {
  const { notificationId, type, title, message, referenceType, referenceId, isRead, createdAt } =
    item;
  const { icon, bg } = getAlertIconBackgroundColor(type, referenceType);
  const IconSize = referenceType === "NOTICE" ? 20 : 15;
  const alertTitle = getAlertTitle(type, referenceType);
  const alertMessage = referenceType === "NOTICE" ? title : message;

  return (
    // TODO(형준): 기능 구현 시 button 태그로 변경 가능성 있음
    <Link
      href="#"
      aria-label="알림 확인, 외부 페이지 이동"
      key={notificationId}
      className={cn(
        "flex min-h-[86px] w-full cursor-pointer gap-3 border-b border-divider-default p-5 transition-colors hover:bg-fill-flatGray-25",
        isRead ? "bg-white" : "bg-fill-brand-subtle-default_3 hover:bg-fill-brand-subtle-default_2"
      )}
    >
      <div className={cn("h-[30px] w-[30px] flex-shrink-0 rounded-full flex-center", bg)}>
        <Icon name={icon as IconName} size={IconSize} />
      </div>
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-body2-medium">{renderTitle(alertTitle)}</div>
          <span className="text-caption1-regular text-neutral-normal-placeholder">
            {formatDate(createdAt)}
          </span>
        </div>
        <span className="line-clamp-1 text-body2-regular text-neutral-strong-default">
          {alertMessage}
        </span>
      </div>
    </Link>
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
