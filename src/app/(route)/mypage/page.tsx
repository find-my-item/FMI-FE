import MenuSection from "./_components/MyPageMenuSection/MyPageMenuSection";
import { MypageMenuType } from "./_types/MypageMenuType";
import { TAP_CONFIG } from "./_constants/TAP_CONFIG";
import MyPageTapItem from "./_components/MyPageTapItem/MyPageTapItem";
import MyPageProfile from "./_components/MyPageProfile/MyPageProfile";

const MENU_LIST: MypageMenuType[] = ["내 활동", "알림", "신고/문의", "계정 설정"];

const page = () => {
  return (
    <div className="flex w-full flex-col">
      <MyPageProfile email="abc@gmail.com" userName="사용자 닉네임" />

      <div className="w-full gap-[26px] px-5 py-[6px] flex-center">
        {TAP_CONFIG.map((item, index) => (
          <MyPageTapItem key={index} tapName={item.tapName} iconName={item.iconName} />
        ))}
      </div>

      {MENU_LIST.map((item) => (
        <MenuSection key={item} menu={item} />
      ))}
    </div>
  );
};

export default page;
