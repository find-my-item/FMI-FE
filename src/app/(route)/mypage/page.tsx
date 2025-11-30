import { Button, Icon, Tab } from "@/components";
import { ComponentProps } from "react";
import MenuSection from "./_components/MenuSection/MenuSection";

type TapConfig = {
  id: string;
  iconName: ComponentProps<typeof Icon>["name"];
};

const TAP_CONFIG: TapConfig[] = [
  { id: "공지사항", iconName: "AnnotationAlert" },
  { id: "고객센터", iconName: "HeadPhone" },
  { id: "채팅목록", iconName: "MessageTyping" },
];

const MENU_LIST = ["내 활동", "알림", "신고/문의", "계정 설정"];

const page = () => {
  return (
    <div className="min-h-scree flex w-full flex-col">
      <div className="flex h-[120px] w-full flex-row items-center justify-between bg-slate-100 px-5 py-[30px]">
        {/* 프로필 */}
        <div className="flex h-[60px] w-[188px] flex-row items-center gap-6">
          <div className="h-[60px] w-[60px] rounded-full bg-slate-600" />
          <div>
            <p className="text-body1-semibold">사용자 닉네임</p>
            <p className="text-body2-regular text-layout-body-default">asdf@gmail.com</p>
          </div>
        </div>
        {/* 버튼 */}
        <Button variant="outlined"> 프로필 수정 </Button>
      </div>

      <div className="flex h-[96px] w-full items-center justify-center">
        <div className="flex-row-center flex h-[84px] w-[350px] items-center justify-center gap-[52px] bg-slate-200">
          {/* 공지사항/고객센터/채팅목록 */}
          {TAP_CONFIG.map((item) => (
            <div className="flex h-[84px] w-[82px] flex-col items-center justify-center gap-2 bg-slate-100 py-4">
              <Icon name={item.iconName} size={24} />
              <p className="text-body2-medium text-neutral-strong-default">{item.id}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-slate-300 px-5 py-6">
        {MENU_LIST.map((item) => (
          <MenuSection menu={item} />
        ))}
      </div>
    </div>
  );
};

export default page;
