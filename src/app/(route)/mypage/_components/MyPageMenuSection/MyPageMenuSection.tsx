import { Icon } from "@/components";
import { cn } from "@/utils";
import { MypageMenuType } from "../../_types/MypageMenuType";
import { MYPAGE_MENU_LIST } from "../../_constants/MYPAGE_MENU_LIST";
import MyPageMenuItem from "../MyPageMenuItem/MyPageMenuItem";

interface MenuSectionProps {
  menu: MypageMenuType;
}

const MenuSection = ({ menu }: MenuSectionProps) => {
  const MenuList = MYPAGE_MENU_LIST[menu];

  return (
    <>
      <div className="w-full px-5 py-6">
        <div className="flex h-10 items-center text-body2-regular text-layout-body-default">
          {menu}
        </div>
        {MenuList.map((item) => (
          <MyPageMenuItem key={item.pageName} pageName={item.pageName} />
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
