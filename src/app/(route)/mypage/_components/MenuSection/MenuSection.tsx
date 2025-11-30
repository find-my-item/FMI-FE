import { maxGeneratorDuration } from "framer-motion";
import { Icon } from "@/components";

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

type Menu = "내 활동" | "알림" | "신고/문의" | "계정 설정";

type MenuSectionProps = {
  menu: Menu;
};

const MenuSection = ({ menu }: MenuSectionProps) => {
  return (
    <>
      <div className="flex h-10 items-center text-body2-regular text-layout-body-default">
        {menu}
      </div>
      {LIST_ITEMS.map((item) => (
        <div className="flex h-11 w-full items-center justify-between bg-slate-50 text-body1-semibold text-neutral-strong-default">
          {item.label}
          <button>
            <Icon name="ArrowRightSmall" size={24} />
          </button>
        </div>
      ))}
    </>
  );
};

export default MenuSection;
