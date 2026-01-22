"use client";

import { Filter, KebabMenu } from "@/components/common";
import { useState } from "react";
import { MYPAGE_KEBAB_OPTIONS } from "./MYPAGE_KEBAB_OPTION";

interface MypageKebabFilterProps {
  status: "reports" | "inquiries";
}

const MypageKebabFilter = ({ status }: MypageKebabFilterProps) => {
  const currentStatus = status;
  const [isKebabMenu, setIsKebabMenu] = useState<{ menu: string; open: boolean }>({
    menu: "상태",
    open: false,
  });

  const kebabMenuItems = MYPAGE_KEBAB_OPTIONS[status].map((item) => ({
    text: item.text,
    onClick: () => setIsKebabMenu({ menu: item.text, open: false }),
  }));

  return (
    <section className="flex w-full gap-2 px-5 py-[14px]">
      <h2 className="sr-only">필터링 영역</h2>

      <div className="relative">
        <Filter
          ariaLabel={isKebabMenu.menu}
          onSelected={isKebabMenu.menu === "접수" ? false : true}
          // TODO(수현): 아이콘 색 변경 필요함
          icon={{ name: "ArrowDown", size: 12 }}
          iconPosition="trailing"
          onClick={() => setIsKebabMenu((prev) => ({ ...prev, open: true }))}
        >
          {isKebabMenu.menu}
        </Filter>

        {isKebabMenu.open && (
          <div className="absolute left-0 top-full mt-2">
            <KebabMenu items={kebabMenuItems} />
          </div>
        )}
      </div>
    </section>
  );
};

export default MypageKebabFilter;
