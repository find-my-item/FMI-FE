import { Button, Icon } from "@/components";
import { ComponentProps } from "react";

type TapConfig = {
  id: string;
  iconName: ComponentProps<typeof Icon>["name"];
};

const TAP_CONFIG: TapConfig[] = [
  { id: "공지사항", iconName: "AnnotationAlert" },
  { id: "고객센터", iconName: "HeadPhone" },
  { id: "채팅목록", iconName: "MessageTyping" },
];

const page = () => {
  return (
    <div className="min-h-scree flex w-full flex-col">
      <div className="flex h-[120px] w-full flex-row justify-between bg-slate-100 px-5 py-[30px]">
        {/* 프로필 */}
        <div className="flex h-[60px] w-[188px] flex-row gap-6">
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
        <div className="flex-row-center flex h-[84px] w-[350px] bg-slate-200">
          {/* 공지사항/고객센터/채팅목록 */}
          {TAP_CONFIG.map((item) => (
            <>
              <Icon name={item.iconName} size={20} />
              <p>{item.id}</p>
            </>
          ))}
        </div>
      </div>

      <div className="bg-slate-300">탭 목록들</div>
    </div>
  );
};

export default page;
