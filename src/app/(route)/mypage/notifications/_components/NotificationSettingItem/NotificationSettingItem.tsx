"use client";

import { useState } from "react";
import { NotificationLabelType, NotificationSettingType } from "../../_types/NotificationType";
import { cn } from "@/utils";
import { Icon, ToggleButton } from "@/components/common";
import NotificationCategory from "../NotificationCategory/NotificationCategory";
// import { CategoryType } from "@/types";
import { NotificationSetting } from "@/api/fetch/notification";
import { useToggleClick } from "../../_hooks/useToggleClick";

interface NotificationSettingItem {
  item: { label: NotificationLabelType; value: NotificationSettingType };
  browserNotification: boolean;
  notificationStatus: NotificationSetting; // 전체 알림 상태
  isOn: boolean; // 각 알림의 현재 상태
  // categoryOn?: CategoryType[];
}

const NotificationSettingItem = ({
  item,
  browserNotification = false,
  notificationStatus,
  isOn,
  // categoryOn,
}: NotificationSettingItem) => {
  const { label, value } = item;

  const toggleAriaLabel = label + "토글";
  // const [isNotificationOn, setIsNotificationOn] = useState(isOn);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const { handleToggle } = useToggleClick(notificationStatus);
  return (
    <>
      <li className="w-full px-5 py-2">
        <div
          className={cn(
            "flex h-11 w-full items-center justify-between pl-[10px]",
            value === "enabledCategories" && "pl-[18px]"
          )}
        >
          {value === "enabledCategories" ? (
            <button
              onClick={() => setIsBottomSheetOpen(true)}
              className="flex w-full items-center justify-between"
            >
              <span className="my-[10px] ml-[10px] text-body1-medium text-neutral-normal-placeholder">
                카테고리 키워드 선택
              </span>
              <Icon name="ArrowRightSmall" size={24} className="text-neutral-strong-default" />
            </button>
          ) : (
            <>
              <span className="text-body1-semibold text-neutral-normal-default">{label}</span>
              <ToggleButton
                disabled={!browserNotification}
                ariaLabel={toggleAriaLabel}
                toggleState={isOn}
                onClick={() => handleToggle(value)}
              />
            </>
          )}
        </div>
      </li>

      <NotificationCategory
        isBottomSheetOpen={isBottomSheetOpen}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
        categoryOn={notificationStatus.enabledCategories}
      />
    </>
  );
};

export default NotificationSettingItem;
