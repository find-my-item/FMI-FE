"use client";

import { Filter, KebabMenu } from "@/components/common";
import { useState } from "react";
import { MYPAGE_COMMENTS_KEBAB_OPTIONS } from "../../_constant/MYPAGE_COMMENTS_KEBAB_OPTIONS";

const MypageKebabFilter = () => {
  const [isKebabMenu, setIsKebabMenu] = useState<{ menu: string; open: boolean }>({
    menu: "최신순",
    open: false,
  });

  const kebabMenuItems = MYPAGE_COMMENTS_KEBAB_OPTIONS.map((item) => ({
    text: item.text,
    onClick: () => setIsKebabMenu({ menu: item.text, open: false }),
  }));

  return (
    <section className="flex w-full gap-2 px-5 py-[14px]">
      <h2 className="sr-only">필터링 영역</h2>

      <div className="relative">
        <Filter
          ariaLabel={isKebabMenu.menu}
          icon={{ name: "ArrowDown", size: 16 }}
          onSelected={false}
          onClick={() => setIsKebabMenu((prev) => ({ ...prev, open: true }))}
          iconPosition="trailing"
        >
          {isKebabMenu.menu}
        </Filter>
        {isKebabMenu.open && (
          <div className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2">
            <KebabMenu items={kebabMenuItems} />
          </div>
        )}
      </div>
    </section>
  );
};

export default MypageKebabFilter;
