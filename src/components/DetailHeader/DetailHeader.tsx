"use client";

import React from "react";
import Icon from "@/components/Icon/Icon";
import { useRouterBack } from "@/utils/useRouterBack";

const DetailHeader = ({ title }: { title: string }) => {
  const { back } = useRouterBack();

  return (
    <div className="w-full h-[56px] px-[20px] flex items-center justify-start gap-[3px]">
      <button className="w-[30px] h-[30px]" onClick={() => back()} aria-label="뒤로가기">
        <Icon name="ArrowLeftSmall" size={30} />
      </button>
      <h1 className="text-[20px] font-semibold text-[#242424]">{title}</h1>
    </div>
  );
};

export default DetailHeader;
