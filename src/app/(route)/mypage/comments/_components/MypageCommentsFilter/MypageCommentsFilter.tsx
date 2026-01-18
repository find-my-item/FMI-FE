"use client";

import { Filter, KebabMenu } from "@/components/common";
import MypageCommentsBottomSheet from "../MypageCommentsBottomSheet/MypageCommentsBottomSheet";
import { useState } from "react";

const MypageCommentsFilter = () => {
  const [isBottomSheet, setIsBottomSheet] = useState(false);
  const [isKebabMenu, setIsKebabMenu] = useState<{ menu: string; open: boolean }>({
    menu: "최신순",
    open: false,
  });

  const kebabMenuItems = [
    { text: "최신순", onClick: () => setIsKebabMenu({ menu: "최신순", open: false }) },
    { text: "오래된 순", onClick: () => setIsKebabMenu({ menu: "오래된 순", open: false }) },
  ];

  return (
    <section className="flex w-full gap-2 px-5 py-[14px]">
      <h2 className="sr-only">필터링 영역</h2>

      <Filter
        ariaLabel="기간"
        icon={{ name: "Calendar", size: 16 }}
        onSelected={false}
        onClick={() => setIsBottomSheet(true)}
        iconPosition="leading"
      >
        기간
      </Filter>

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

      <MypageCommentsBottomSheet onClose={() => setIsBottomSheet(false)} isOpen={isBottomSheet} />
    </section>
  );
};

export default MypageCommentsFilter;
