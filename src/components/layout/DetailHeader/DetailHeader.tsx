"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/common";

interface DetailHeaderProps {
  title?: string;
  children?: ReactNode;
}

const DetailHeader = ({ title = "", children }: DetailHeaderProps) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between bg-white px-5">
      <div className="flex items-center gap-2">
        <button
          className="h-[30px] w-[30px]"
          type="button"
          onClick={() => router.back()}
          aria-label="뒤로가기"
        >
          <Icon name="ArrowLeftSmall" size={30} />
        </button>
        {title && <h2 className="text-xl font-semibold text-layout-header-default">{title}</h2>}
      </div>
      {children && (
        <div className="flex gap-[23.5px]" aria-label="헤더 액션">
          {children}
        </div>
      )}
    </header>
  );
};

export default DetailHeader;
