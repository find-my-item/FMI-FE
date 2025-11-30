import { Button, Icon, Tab } from "@/components";
import { ComponentProps } from "react";
import MenuSection from "./_components/MenuSection/MenuSection";
import { Menu } from "./_components/MenuSection/MenuSection";

type TapConfig = {
  id: string;
  iconName: ComponentProps<typeof Icon>["name"];
};

const TAP_CONFIG: TapConfig[] = [
  { id: "공지사항", iconName: "AnnotationAlert" },
  { id: "고객센터", iconName: "HeadPhone" },
  { id: "채팅목록", iconName: "MessageTyping" },
];

const MENU_LIST: Menu[] = ["내 활동", "알림", "신고/문의", "계정 설정"];

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
        {/* 버튼 */}
        <Button variant="outlined"> 프로필 수정 </Button>
      </div>

      <div className="flex h-[96px] w-full items-center justify-center">
        <div className="flex-row-center flex h-[84px] w-[350px] items-center justify-center">
          {/* 공지사항/고객센터/채팅목록 */}
          {TAP_CONFIG.map((item, index) => (
            <>
              <div
                key={index}
                className="flex h-[84px] w-[82px] flex-col items-center justify-center gap-2 py-4"
              >
                <Icon name={item.iconName} size={24} />
                <p className="text-body2-medium text-neutral-strong-default">{item.id}</p>
              </div>
              {item.id !== "채팅목록" && (
                <div className="flex w-[52px] items-center justify-center">
                  <div className="h-[46px] border border-divider-default_3" />
                </div>
              )}
            </>
          ))}
        </div>
      </div>

      {/* <div className="w-full px-5 py-6"> */}
      {MENU_LIST.map((item) => (
        <MenuSection key={item} menu={item} />
      ))}
      {/* </div> */}
    </div>
  );
};

export default page;
