import { DetailHeader } from "@/components/layout";
import NotificationSettingItem from "./_components/NotificationSettingItem/NotificationSettingItem";
// TODO(수현): 마케팅 이메일 수신 동의 문구 제안 중
export const NOTIFICATION_ITEM = [
  "카테고리 키워드",
  "채팅",
  "댓글",
  "즐겨찾기",
  "1:1 문의",
  "신고",
  "공지사항",
  "마케팅 목적의 이메일 수신 동의",
] as const;

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
