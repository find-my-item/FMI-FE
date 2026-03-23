"use client";

import { Button, CheckBox, ConfirmModal, Icon } from "@/components/common";
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
import { ALERT_ROW_BG } from "./_internal/ALERT_ROW_BG";
import { useState } from "react";
import useNotificationDelete from "@/api/fetch/notification/api/useNotificationDelete";

interface AlertItemProps {
  item: NotificationListItem;
  isDeleteMode: boolean;
  selectedNotifications: number[];
  setSelectedNotifications: (selectedNotifications: number[]) => void;
}

const AlertItem = ({
  item,
  isDeleteMode,
  selectedNotifications,
  setSelectedNotifications,
}: AlertItemProps) => {
  const router = useRouter();
  const { notificationId, type, title, message, referenceType, referenceId, isRead, createdAt } =
    item;
  const { mutate: readNotification } = useNotificationRead();
  const { icon, bg } = getAlertIconBackgroundColor(type, referenceType);
  const titleSegments = getAlertTitleSegments(type, title);
  const IconSize = referenceType === "NOTICE" ? 20 : 15;

  const handleAlertRoute = () => {
    if (isDeleteMode) return;

    readNotification({ ids: [notificationId] });
    router.push(alertRouteUrl(referenceType, referenceId));
  };

  const handleSelectNotification = (notificationId: number) => {
    if (selectedNotifications.includes(notificationId)) {
      setSelectedNotifications(selectedNotifications.filter((id) => id !== notificationId));
    } else {
      setSelectedNotifications([...selectedNotifications, notificationId]);
    }
  };

  return (
    <button
      onClick={handleAlertRoute}
      aria-label="알림 확인, 외부 페이지 이동"
      key={notificationId}
      className={cn(
        "flex min-h-[86px] w-full items-start gap-3 border-b border-divider-default p-5 text-left transition-colors",
        isDeleteMode ? "cursor-default" : "cursor-pointer",
        isRead
          ? ALERT_ROW_BG.read[isDeleteMode ? "delete" : "default"]
          : ALERT_ROW_BG.unread[isDeleteMode ? "delete" : "default"]
      )}
    >
      {isDeleteMode && (
        <CheckBox
          id={String(notificationId)}
          label=""
          state={isRead}
          boxSize="size-6"
          onClick={() => handleSelectNotification(notificationId)}
        />
      )}
      <div className={cn("h-[30px] w-[30px] flex-shrink-0 rounded-full flex-center", bg)}>
        <Icon name={icon as IconName} size={IconSize} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex min-w-0 items-center justify-between gap-2">
          <div className="min-w-0 flex-1 truncate text-body2-medium text-neutral-normal-default">
            {titleSegments.map((seg, i) => (
              <span key={i} className={cn(seg.emphasize && "text-brand-normal-default")}>
                {seg.text}
              </span>
            ))}
          </div>
          <span className="shrink-0 text-caption1-regular text-neutral-normal-placeholder">
            {formatDate(createdAt)}
          </span>
        </div>
        <span className="min-w-0 truncate text-body2-regular text-neutral-strong-default">
          {message}
        </span>
      </div>
    </button>
  );
};

interface AlertViewProps {
  isDeleteMode: boolean;
  setIsDeleteMode: (isDeleteMode: boolean) => void;
}

const AlertView = ({ isDeleteMode, setIsDeleteMode }: AlertViewProps) => {
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
  const { mutate: deleteNotifications } = useNotificationDelete();
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (notifications?.length === 0) {
    return (
      <EmptyState
        icon={{ iconName: "AlertBell", iconSize: 70 }}
        title="아직 새 소식이 없어요"
        description={`주변을 계속 살펴보고 있어요.\n새로운 알림이 생기면 바로 알려드릴게요.`}
      />
    );
  }

  const handleDeleteNotifications = () => {
    deleteNotifications({ ids: selectedNotifications });
    setSelectedNotifications([]);
    setIsDeleteMode(false);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      {notifications?.map((item) => (
        <AlertItem
          key={item.notificationId}
          item={item}
          isDeleteMode={isDeleteMode}
          selectedNotifications={selectedNotifications}
          setSelectedNotifications={setSelectedNotifications}
        />
      ))}
      {hasNextPage && <div ref={alertListRef} className="h-[100px]" />}

      {isDeleteMode && <div aria-hidden className="h-[86px]" />}
      {isDeleteMode && (
        <div className="fixed bottom-[86px] left-0 right-0 mx-auto flex max-w-[768px] gap-2 border-x-2 border-t border-t-divider-default bg-white px-4 pb-8 pt-3">
          <Button size="big" variant="outlined" className="w-[116px] text-system-warning">
            전체 삭제
          </Button>
          <Button
            size="big"
            disabled={selectedNotifications.length === 0}
            className="flex-1"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            선택 삭제
          </Button>
        </div>
      )}

      <ConfirmModal
        title="정말로 알림을 삭제하시겠어요?"
        content="삭제한 알림은 복구할 수 없습니다."
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteNotifications}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
};

export default AlertView;
