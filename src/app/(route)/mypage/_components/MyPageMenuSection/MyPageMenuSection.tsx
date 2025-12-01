import { Icon } from "@/components";
import { cn } from "@/utils";
import { MypageMenuType } from "../../_types/MypageMenuType";
import { MYPAGE_MENU_LIST } from "../../_constants/MYPAGE_MENU_LIST";

interface MenuSectionProps {
  menu: MypageMenuType;
}

const MenuSection = ({ menu }: MenuSectionProps) => {
  const ListItems = MYPAGE_MENU_LIST[menu];

  return (
    <>
      <div className="w-full px-5 py-6">
        <div className="flex h-10 items-center text-body2-regular text-layout-body-default">
          {menu}
        </div>
        {ListItems.map((item) => (
          <div
            key={item.label}
            className="flex h-11 w-full items-center justify-between text-body1-semibold text-neutral-strong-default"
          >
            {item.label}
            <button>
              <Icon name="ArrowRightSmall" size={24} />
            </button>
          </div>
        ))}
      </div>
      <hr
        className={cn(
          "mx-5 max-w-full border border-divider-default_3",
          menu === "계정 설정" && "opacity-0"
        )}
      />
    </>
  );
};

export default MenuSection;
