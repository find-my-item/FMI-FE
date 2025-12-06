import { MyPageIconNav, MyPageMenuSection, MyPageProfile } from "./_components";
import { MYPAGE_MENU_LIST } from "./_constants/MYPAGE_MENU_LIST";

const page = () => {
  return (
    <div className="flex w-full flex-col">
      <MyPageProfile email="abc@gmail.com" userName="사용자 닉네임" />

      <MyPageIconNav />

      <MyPageMenuSection />
    </div>
  );
};

export default page;
