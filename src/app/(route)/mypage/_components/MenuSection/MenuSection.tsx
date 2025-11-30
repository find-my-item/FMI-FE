import { Icon } from "@/components";

export type Menu = "내 활동" | "알림" | "신고/문의" | "계정 설정";

const LIST_ITEMS: Record<Menu, { label: string }[]> = {
  "내 활동": [
    { label: "내가 쓴 게시물" },
    { label: "내가 쓴 댓글" },
    { label: "즐겨찾기 목록" },
    { label: "내 활동 내역" },
  ],
  알림: [{ label: "알림 설정" }],
  "신고/문의": [{ label: "내 신고 내역" }, { label: "내 문의 내역" }],
  "계정 설정": [{ label: "이메일 변경" }, { label: "비밀번호 변경" }, { label: "회원 탈퇴" }],
};

type MenuSectionProps = {
  menu: Menu;
};

const MenuSection = ({ menu }: MenuSectionProps) => {
  const ListItems = LIST_ITEMS[menu];

  return (
    <>
      <div className="w-full px-5 py-6">
        <div className="flex h-10 items-center text-body2-regular text-layout-body-default">
          {menu}
        </div>
        {ListItems.map((item, index) => (
          <div
            key={index}
            className="flex h-11 w-full items-center justify-between text-body1-semibold text-neutral-strong-default"
          >
            {item.label}
            <button>
              <Icon name="ArrowRightSmall" size={24} />
            </button>
          </div>
        ))}
      </div>
      <div className="mx-5 max-w-full border border-divider-default_3" />
    </>
  );
};

export default MenuSection;
