import { Filter } from "@/components/common";
import MypageCommentsBottomSheet from "../MypageCommentsBottomSheet/MypageCommentsBottomSheet";
import { MYPAGE_COMMENTS_FILTER } from "../../_constants/MYPAGE_COMMENTS_FILTER";
import { useState } from "react";

const MypageCommentsFilter = () => {
  const [isBottomOpen, setIsBottomOpen] = useState(false);
  const [bottomState, setBottomState] = useState<"Date" | "Filter">("Date");

  const handleFilterClick = (name: string) => {
    setIsBottomOpen(true);
    if (name === "기간") {
      setBottomState("Date");
    } else {
      setBottomState("Filter");
    }
  };

  return (
    <section className="flex w-full gap-2 overflow-x-auto px-5 py-[14px]">
      <h2 className="sr-only">필터링 영역</h2>
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

      <MypageCommentsBottomSheet isOpen={isBottomOpen} onClose={() => setIsBottomOpen(false)} />
    </section>
  );
};

export default MypageCommentsFilter;
