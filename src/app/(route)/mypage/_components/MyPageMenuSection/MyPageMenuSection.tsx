"use client";

import React, { Fragment } from "react";
import { Icon } from "@/components/common";
import Link from "next/link";
import { MYPAGE_MENU_LIST } from "../../_constants/MYPAGE_ROUTE_CONFIG";
import useLogout from "@/hooks/useLogout/useLogout";

const MyPageMenuSection = () => {
  const { handleLogout } = useLogout();

  return MYPAGE_MENU_LIST.map((menu) => (
    <Fragment key={menu.title}>
      <div className="flex w-full flex-col gap-3 px-5 py-6">
        <div className="flex text-body2-regular text-layout-body-default">{menu.title}</div>

        {menu.pages.map((item) => (
          <Fragment key={item.pageName}>
            <Link
              key={item.pageName}
              href={item.pageLink}
              className="flex w-full justify-between py-[10px] text-body1-semibold text-neutral-strong-default"
            >
              {item.pageName}
              <Icon name="ArrowRightSmall" size={24} />
            </Link>
            {item.pageName === "회원 탈퇴" && (
              <button
                className="flex w-full py-[10px] text-body1-semibold text-neutral-strong-default"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            )}
          </Fragment>
        ))}
      </div>
      {menu.title !== "계정 설정" && (
        <hr className="mx-5 max-w-full border border-divider-default_3" />
      )}
    </Fragment>
  ));
};

export default MyPageMenuSection;
