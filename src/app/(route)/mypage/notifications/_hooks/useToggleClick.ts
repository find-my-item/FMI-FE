import usePutNotificationSetting from "@/api/fetch/notification/api/usePutNotificationSetting";
import { NotificationSettingType } from "../_types/NotificationType";
import { NotificationSetting } from "@/api/fetch/notification";

export const useToggleClick = (notificationData?: NotificationSetting) => {
  const { mutate: notificationMutate, isPending } = usePutNotificationSetting();

  const handleToggle = (settingName: NotificationSettingType) => {
    if (isPending || !notificationData) return;

    const currentStatus = notificationData?.[settingName];
    const nextState = !currentStatus;

    notificationMutate({ [settingName]: nextState });
  };

  return {
    handleToggle,
    isPending,
  };
};
