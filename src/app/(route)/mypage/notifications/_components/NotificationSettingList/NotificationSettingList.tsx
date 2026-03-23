"use client";

import { Icon, ToggleButton } from "@/components/common";
import { NotificationLabelType, NotificationType } from "../../_types/NotificationType";
import { useState } from "react";
import { NOTIFICATION_CONFIG } from "../../_constants/NOTIFICATION_ITEM";
import { cn } from "@/utils";

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

      {/* {label === "카테고리 키워드" && (
        <button
          onClick={() => setIsBottomSheetOpen(true)}
          className="flex w-full items-center justify-between px-4 py-5"
        >
          <span className="my-[10px] ml-[10px] text-body1-medium text-neutral-normal-placeholder">
            카테고리 키워드 선택
          </span>
          <Icon name="ArrowRightSmall" size={24} className="text-neutral-strong-default" />
        </button>
      )} */}

      {/* TODO(수현): 바텀 시트 변경으로 인한 수정 필요 */}
      {/* <SelectBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        title="카테고리 키워드"
        option={CATEGORY_OPTIONS}
      /> */}
    </>
  );
};

const NotificationSettingList = () => {
  const [isBrowserOn, setIsBrowserOn] = useState(false);
  const [isMarketingOn, setIsMarketingOn] = useState(false);

  return (
    <ul className="w-full py-4">
      <li className="w-full px-5 py-2">
        <div className="flex h-11 w-full items-center justify-between">
          <h3 className="text-h3-semibold text-neutral-normal-default">알림 설정</h3>
          <ToggleButton
            ariaLabel="전체 알림 설정"
            toggleState={isBrowserOn}
            onClick={() => setIsBrowserOn((prev) => !prev)}
          />
        </div>
      </li>

      <div className="mb-4 flex flex-col gap-[2px]">
        {NOTIFICATION_CONFIG.map((item) => (
          <NotificationSettingItem key={item.value} item={item} />
        ))}
      </div>

      <li className="w-full border-t border-border-neutral-normal-default px-5 pb-2 pt-4">
        <div className="flex h-11 w-full items-center justify-between">
          <h3 className="text-h3-semibold text-neutral-normal-default">마케팅 수신 동의</h3>

          <ToggleButton
            ariaLabel="마케팅 수신 동의"
            toggleState={isMarketingOn}
            onClick={() => setIsMarketingOn((prev) => !prev)}
          />
        </div>
      </li>
    </ul>
  );
};

export default NotificationSettingList;
