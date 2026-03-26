import usePutNotificationSetting from "@/api/fetch/notification/api/usePutNotificationSetting";
import { NotificationSettingType } from "../_types/NotificationType";
import { NotificationSetting } from "@/api/fetch/notification";
import { useToast } from "@/context/ToastContext";
import { useCallback } from "react";

export const useToggleClick = (notificationData?: NotificationSetting) => {
  const { mutate: notificationMutate, isPending } = usePutNotificationSetting();
  const { addToast } = useToast();

  const handleToggle = useCallback(
    async (settingName: NotificationSettingType) => {
      if (isPending || !notificationData) return;

      const currentStatus = notificationData?.[settingName];
      const nextState = !currentStatus;

      if (settingName === "browserNotificationEnabled" && nextState === true) {
        if (!("Notification" in window)) {
          alert("이 브라우저는 알림 기능을 지원하지 않습니다.");
          return;
        }

        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
          addToast("알림 권한이 거절되었어요", "warning");
          return;
        }
      }

      notificationMutate({ [settingName]: nextState });
    },
    [isPending, notificationData, addToast, notificationMutate]
  );

  return {
    handleToggle,
    isPending,
  };
};
