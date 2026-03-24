"use client";

import { ToggleButton } from "@/components/common";
import { useEffect, useState } from "react";
import { NOTIFICATION_CONFIG } from "../../_constants/NOTIFICATION_ITEM";
import NotificationSettingItem from "../NotificationSettingItem/NotificationSettingItem";
import { useGetNotificationSetting } from "@/api/fetch/notification";
import { LoadingState } from "@/components/state";

const NotificationSettingList = () => {
  const { data: notificationData, isSuccess, isError, isLoading } = useGetNotificationSetting();

  const [isBrowserOn, setIsBrowserOn] = useState(false);
  const [isMarketingOn, setIsMarketingOn] = useState(false);

  useEffect(() => {
    if (isSuccess && notificationData?.result) {
      setIsBrowserOn(notificationData.result.browserNotificationEnabled);
      setIsMarketingOn(notificationData.result.marketingConsent);
    }
  }, [isSuccess, notificationData]);

  if (isLoading) return <LoadingState />;

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
          <NotificationSettingItem key={item.value} item={item} browserNotification={isBrowserOn} />
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
