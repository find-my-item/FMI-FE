import { Button, Icon, Tab } from "@/components";
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

const LIST_ITEMS = [
  { label: "내가 쓴 게시물" },
  { label: "내가 쓴 댓글" },
  { label: "즐겨찾기 목록" },
  { label: "내 활동 내역" },
  { label: "알림 설정" },
  { label: "내 신고 내역" },
  { label: "내 문의 내역" },
  { label: "이메일 변경" },
  { label: "비밀번호 변경" },
  { label: "회원 탈퇴" },
];
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
        <div className="flex h-10 items-center text-body2-regular text-layout-body-default">
          내 활동
        </div>
        {LIST_ITEMS.map((item) => (
          <div className="flex h-11 w-full items-center justify-between bg-slate-50 text-body1-semibold text-neutral-strong-default">
            {item.label}
            <button>
              <Icon name="ArrowRightSmall" size={24} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
