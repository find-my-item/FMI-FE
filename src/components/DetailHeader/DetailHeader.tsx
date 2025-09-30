"use client";

import Icon from "@/components/Icon/Icon";
import { useRouterBack } from "@/utils/useRouterBack";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DetailHeader = ({ title }: { title: string }) => {
  const { back } = useRouterBack();
  const pathname = usePathname();

  return (
    <div className="flex h-[56px] w-full items-center justify-between px-[20px]">
      <div className="flex items-center justify-start gap-[3px]">
        <button className="h-[30px] w-[30px]" onClick={() => back()} aria-label="뒤로가기">
          <Icon name="ArrowLeftSmall" size={30} />
        </button>
        <h1 className="text-[20px] font-semibold text-[#242424]">{title}</h1>
      </div>
      {pathname === "/list" && <Icon name="Search" size={24} />}
    </div>
  );
};

export default DetailHeader;
