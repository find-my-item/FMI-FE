import useAppMutation from "@/api/_base/query/useAppMutation";
import { PutNotificationSetting } from "../types/notificationSettingType";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

const usePutNotificationSetting = () => {
  return useAppMutation<PutNotificationSetting, PutNotificationSetting, ApiBaseResponseType<null>>(
    "auth",
    "/notifications/settings",
    "put"
  );
};

export default usePutNotificationSetting;
