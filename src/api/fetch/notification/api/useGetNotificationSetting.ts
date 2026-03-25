import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetNotificationSetting } from "../types/notificationSettingType";

const useGetNotificationSetting = () => {
  return useAppQuery<GetNotificationSetting, unknown>(
    "auth",
    ["/notifications/settings"],
    "/notifications/settings"
  );
};

export default useGetNotificationSetting;
