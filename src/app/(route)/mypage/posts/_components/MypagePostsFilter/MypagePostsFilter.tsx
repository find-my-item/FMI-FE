import { Filter } from "@/components/common";
import { MYPAGE_POSTS_FILTER } from "../../_constants/MYPAGE_POSTS_FILTER";
import MypagePostsBottomSheet from "../MypagePostsBottomSheet/MypagePostsBottomSheet";
import { useState } from "react";
import { FilterModeType } from "../../_types/FilterModeType";

const MypagePostsFilter = () => {
  const [isBottomSheet, setIsBottomSheet] = useState<{
    isOpen: boolean;
    mode: FilterModeType;
  }>({
    isOpen: false,
    mode: "Date",
  });

  // TODO(수현): name 타입 안정성 높이기
  const handleFilterClick = (name: string) => {
    if (name === "기간") {
      setIsBottomSheet({
        isOpen: true,
        mode: "Date",
      });
    } else {
      setIsBottomSheet({
        isOpen: true,
        mode: "Filter",
      });
    }
  };

  return (
    <section className="hidden-scrollbar flex w-full gap-2 overflow-x-auto px-5 py-[14px]">
      <h2 className="sr-only">필터링 영역</h2>
      {MYPAGE_POSTS_FILTER.map((item) => (
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

      <MypagePostsBottomSheet
        onClose={() => setIsBottomSheet((prev) => ({ ...prev, isOpen: false }))}
        isOpen={isBottomSheet.isOpen}
        mode={isBottomSheet.mode}
      />
    </section>
  );
};

export default MypagePostsFilter;
