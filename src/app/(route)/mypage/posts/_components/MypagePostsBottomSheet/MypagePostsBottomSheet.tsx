// TODO(수현): 피그마 시안 변경되어 수정될 컴포넌트

"use client";

import { cn } from "@/utils";
import { Button, Filter } from "@/components/common";
import { PopupLayout } from "@/components/domain";
import { MYPAGE_POSTS_SHEET_FILTER } from "../../_constants/MYPAGE_POSTS_SHEET_FILTER";
import { FilterModeType } from "../../_types/FilterModeType";
import { DateRangeBottomSheet } from "../../../_internal";

interface MypagePostsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  mode: FilterModeType;
}

const MypagePostsBottomSheet = ({ isOpen, onClose, mode }: MypagePostsBottomSheetProps) => {
  if (mode === "Date") {
    return <DateRangeBottomSheet isOpen={isOpen} onClose={onClose} />;
  }
  if (mode === "Filter") {
    return (
      <PopupLayout
        isOpen={isOpen}
        onClose={onClose}
        className={cn("w-full gap-12 px-5 py-10 flex-col-center")}
      >
        <div className="flex gap-8 flex-col-center">
          <h2 className="text-h2-medium text-layout-header-default">필터</h2>
          {MYPAGE_POSTS_SHEET_FILTER.map((item) => (
            <div key={item.title} className="flex w-full flex-col gap-4">
              <h3 className="text-h3-semibold text-layout-header-default">{item.title}</h3>
              <div className="flex flex-wrap gap-2">
                {item.kind.map((item) => (
                  <Filter key={item} ariaLabel={item} onSelected={false} className="px-[18px] py-2">
                    {item}
                  </Filter>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Button onClick={onClose} size="big" className="h-[44px] w-full">
          적용하기
        </Button>
      </PopupLayout>
    );
  }
};

export default MypagePostsBottomSheet;
