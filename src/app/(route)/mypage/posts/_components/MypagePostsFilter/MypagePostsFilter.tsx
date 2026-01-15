import { Filter } from "@/components/common";
import { MYPAGE_POSTS_FILTER } from "../../_constants/MYPAGE_POSTS_FILTER";
import MypagePostsBottomSheet from "../MypagePostsBottomSheet/MypagePostsBottomSheet";
import { useState } from "react";
import { FilterModeType } from "../../_types/FilterModeType";

const MypagePostsFilter = () => {
  const [isBottomOpen, setIsBottomOpen] = useState(false);
  const [bottomStateType, setBottomStateType] = useState<FilterModeType>("Date");

  const handleFilterClick = (name: string) => {
    setIsBottomOpen(true);
    if (name === "기간") {
      setBottomStateType("Date");
    } else {
      setBottomStateType("Filter");
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
        isOpen={isBottomOpen}
        onClose={() => setIsBottomOpen(false)}
        mode={bottomStateType}
      />
    </section>
  );
};

export default MypagePostsFilter;
