import MenuSection from "./_components/MyPageMenuSection/MyPageMenuSection";
import { MypageMenuType } from "./_types/MypageMenuType";
import MyPageProfile from "./_components/MyPageProfile/MyPageProfile";
import MyPageIconNav from "./_components/MyPageIconNav/MyPageIconNav";

const MENU_LIST: MypageMenuType[] = ["내 활동", "알림", "신고/문의", "계정 설정"];

const page = () => {
  return (
    <div className="flex w-full flex-col">
      <MyPageProfile email="abc@gmail.com" userName="사용자 닉네임" />
      <MyPageIconNav />

      {MENU_LIST.map((item) => (
        <MenuSection key={item} menu={item} />
      ))}
    </div>
  );
};

export default page;
