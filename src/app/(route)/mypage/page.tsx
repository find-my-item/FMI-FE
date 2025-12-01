import { Button, Icon, Tab } from "@/components";
import MenuSection from "./_components/MyPageMenuSection/MyPageMenuSection";
import { MypageMenuType } from "./_types/MypageMenuType";
import { TAP_CONFIG } from "./_constants/TAP_CONFIG";
import Profile from "./_components/MyPageProfile/Profile";
import MyPageTapList from "./_components/MyPageTapList/MyPageTapList";

const MENU_LIST: MypageMenuType[] = ["내 활동", "알림", "신고/문의", "계정 설정"];

const page = () => {
  return (
    <div className="min-h-scree flex w-full flex-col">
      <div className="flex h-[120px] w-full flex-row items-center justify-between px-5 py-[30px]">
        <Profile userName="사용자 닉네임" email="abc@gamil.com" />
        <Button variant="outlined"> 프로필 수정 </Button>
      </div>

      <div className="flex h-[96px] w-full items-center justify-center gap-[26px] px-5 py-[6px]">
        {TAP_CONFIG.map((item, index) => (
          <MyPageTapList key={index} tapName={item.tapName} iconName={item.iconName} />
        ))}
      </div>

      {MENU_LIST.map((item) => (
        <MenuSection key={item} menu={item} />
      ))}
    </div>
  );
};

export default page;
