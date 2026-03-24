"use client";

import { useState } from "react";
import { NotificationLabelType, NotificationType } from "../../_types/NotificationType";
import { cn } from "@/utils";
import { Icon, ToggleButton } from "@/components/common";
import { CategoryType } from "@/types";
import NotificationCategory from "../NotificationCategory/NotificationCategory";

interface NotificationSettingItem {
  item: { label: NotificationLabelType; value: NotificationType };
}

const NotificationSettingItem = ({ item }: NotificationSettingItem) => {
  const { label, value } = item;

  const toggleAriaLabel = label + "토글";
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <>
      <li className="w-full px-5 py-2">
        <div
          className={cn(
            "flex h-11 w-full items-center justify-between pl-[10px]",
            label === "카테고리 키워드 선택" && "pl-[18px]"
          )}
        >
          {label === "카테고리 키워드 선택" ? (
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
                ariaLabel={toggleAriaLabel}
                toggleState={isNotificationOn}
                onClick={() => setIsNotificationOn((prev) => !prev)}
              />
            </>
          )}
        </div>
      </li>

      <NotificationCategory
        isBottomSheetOpen={isBottomSheetOpen}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
      />
    </>
  );
};

export default NotificationSettingItem;
