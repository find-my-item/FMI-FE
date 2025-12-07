import React from "react";
import { Icon } from "@/components";
import Link from "next/link";
import { MYPAGE_MENU_LIST } from "../../_constants/MYPAGE_MENU_LIST";

const MyPageMenuSection = () => {
  return MYPAGE_MENU_LIST.map((menu) => (
    <React.Fragment key={menu.title}>
      <div className="w-full px-5 py-6">
        <div className="h-menus-center flex text-body2-regular text-layout-body-default">
          {menu.title}
        </div>
        {menu.pages.map((item) => (
          <Link
            key={item.pageName}
            href={item.pageLink}
            className="flex h-11 w-full justify-between py-[10px] text-body1-semibold text-neutral-strong-default"
          >
            {item.pageName}
            <Icon name="ArrowRightSmall" size={24} />
          </Link>
        ))}
      </div>
      {menu.title !== "계정 설정" && (
        <hr className="mx-5 max-w-full border border-divider-default_3" />
      )}
    </React.Fragment>
  ));
};

export default MyPageMenuSection;
