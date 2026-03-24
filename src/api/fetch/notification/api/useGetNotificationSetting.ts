import useAppQuery from "@/api/_base/query/useAppQuery";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { GetNotificationSetting } from "../types/notificationSettingType";

const useGetNotificationSetting = () => {
  return useAppQuery<GetNotificationSetting, ApiBaseResponseType<null>>(
    "auth",
    ["/notifications/settings"],
    "/notifications/settings"
  );
};

export default useGetNotificationSetting;
