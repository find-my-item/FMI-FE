import { DetailHeader } from "@/components/layout";
import { NOTIFICATION_ITEM } from "./_constants/NOTIFICATION_ITEM";
import { NotificationSettingItem } from "./_components";

const page = () => {
  return (
    <>
      <DetailHeader title="알림 설정" />

      <div className="w-full h-base">
        <h1 className="sr-only">알림 설정 페이지</h1>

        <ul className="w-full py-[16px]">
          {NOTIFICATION_ITEM.map((item) => (
            <NotificationSettingItem key={item} settingName={item} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default page;
