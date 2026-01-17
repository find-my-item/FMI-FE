import { Filter, KebabMenu } from "@/components/common";
import MypageCommentsBottomSheet from "../MypageCommentsBottomSheet/MypageCommentsBottomSheet";
import { MYPAGE_COMMENTS_FILTER } from "../../_constants/MYPAGE_COMMENTS_FILTER";
import { useState } from "react";

const MypageCommentsFilter = () => {
  const [isBottomSheet, setIsBottomSheet] = useState(false);
  const [isKebabMenu, setIsKebabMenu] = useState(false);

  const MYPAGE_COMMENTS_KEBAB_ITEM = [
    { text: "최신순", onClick: () => setIsKebabMenu(false) },
    { text: "오래된 순", onClick: () => setIsKebabMenu(false) },
  ];

  // TODO(수현): name 타입 안정성 높이기
  const handleFilterClick = (name: string) => {
    if (name === "최신순") {
      setIsKebabMenu(true);
    } else {
      setIsBottomSheet(false);
    }
  };

  return (
    <section className="flex w-full gap-2 overflow-x-auto px-5 py-[14px]">
      <h2 className="sr-only">필터링 영역</h2>

      <div className="relative">
        {MYPAGE_COMMENTS_FILTER.map((item) => (
          <Filter
            key={item.name}
            ariaLabel={item.name}
            icon={item.icon}
            onSelected={false}
            onClick={() => handleFilterClick(item.name)}
            iconPosition={item.iconPosition}
          >
            {item.name}
          </Filter>
        ))}

        {isKebabMenu && (
          <div className="absolute top-full">
            <KebabMenu items={MYPAGE_COMMENTS_KEBAB_ITEM} />
          </div>
        )}
      </div>

      <MypageCommentsBottomSheet onClose={() => setIsBottomSheet(false)} isOpen={isBottomSheet} />
    </section>
  );
};

export default MypageCommentsFilter;
