import { Button, Icon, Tab } from "@/components";
import MenuSection from "./_components/MenuSection/MenuSection";
import { MypageMenuType } from "./_types/MypageMenuType";
import { TAP_CONFIG } from "./_constants/TAP_CONFIG";

const MENU_LIST: MypageMenuType[] = ["내 활동", "알림", "신고/문의", "계정 설정"];

const page = () => {
  return (
    <div className="min-h-scree flex w-full flex-col">
      <div className="flex h-[120px] w-full flex-row items-center justify-between px-5 py-[30px]">
        {/* 프로필 */}
        <div className="flex h-[60px] w-[188px] flex-row items-center gap-6">
          <div className="h-[60px] w-[60px] rounded-full bg-slate-100" />
          <div>
            <p className="text-body1-semibold">사용자 닉네임</p>
            <p className="text-body2-regular text-layout-body-default">asdf@gmail.com</p>
          </div>
        </div>
        <Button variant="outlined"> 프로필 수정 </Button>
      </div>

      <div className="flex h-[96px] w-full items-center justify-center gap-[26px] px-5 py-[6px]">
        {TAP_CONFIG.map((item, index) => (
          <>
            <div
              key={index}
              className="flex h-[84px] w-[82px] flex-col items-center justify-center gap-2 py-4"
            >
              <Icon name={item.iconName} size={24} />
              <p className="text-body2-medium text-neutral-strong-default">{item.id}</p>
            </div>
            {item.id !== "채팅목록" && <hr className="h-[46px] border border-divider-default_3" />}
          </>
        ))}
        {/* </div> */}
      </div>

      {MENU_LIST.map((item) => (
        <MenuSection key={item} menu={item} />
      ))}
    </div>
  );
};

export default page;
