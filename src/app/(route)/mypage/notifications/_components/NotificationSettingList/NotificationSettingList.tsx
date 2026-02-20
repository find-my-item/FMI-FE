"use client";

import { Icon, ToggleButton } from "@/components/common";
import { NotificationType } from "../../_types/NotificationType";
import { useState } from "react";
import { NOTIFICATION_ITEM } from "../../_constants/NOTIFICATION_ITEM";
import { CATEGORY_OPTIONS } from "@/constants";
import { SelectBottomSheet } from "../../../_internal";

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

      <SelectBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        title="카테고리 키워드"
        option={CATEGORY_OPTIONS}
      />
    </>
  );
};

const NotificationSettingList = () => {
  return (
    <ul className="w-full py-4">
      {NOTIFICATION_ITEM.map((item) => (
        <NotificationSettingItem key={item} settingName={item} />
      ))}
    </ul>
  );
};

export default NotificationSettingList;
