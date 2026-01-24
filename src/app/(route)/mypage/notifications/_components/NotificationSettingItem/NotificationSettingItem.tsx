"use client";

import { Icon, ToggleButton } from "@/components/common";
import { NotificationType } from "../../_types/NotificationType";
import { useState } from "react";
import NotificationBottomSheet from "../NotificationBottomSheet/NotificationBottomSheet";

interface NotificationSettingItem {
  settingName: NotificationType;
}

const NotificationSettingItem = ({ settingName }: NotificationSettingItem) => {
  const toggleAriaLabel = settingName + "토글";
  const [isNotificationOn, setIsNotificationOn] = useState(false);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <>
      <li className="flex w-full items-center justify-between px-5 py-2">
        <span className="my-[10px] text-body1-semibold text-neutral-normal-default">
          {settingName}
        </span>
        <ToggleButton
          ariaLabel={toggleAriaLabel}
          toggleState={isNotificationOn}
          onClick={() => setIsNotificationOn((prev) => !prev)}
        />
      </li>
      {settingName === "카테고리 키워드" && (
        <button
          onClick={() => setIsBottomSheetOpen(true)}
          className="flex w-full items-center justify-between px-4 py-5"
        >
          <span className="my-[10px] ml-[10px] text-body1-medium text-neutral-normal-placeholder">
            카테고리 키워드 선택
          </span>
          <Icon name="ArrowRightSmall" size={24} />
        </button>
      )}

      <NotificationBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
      />
    </>
  );
};

export default NotificationSettingItem;
