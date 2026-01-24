"use client";

import { CATEGORY_OPTIONS } from "@/app/(route)/write/post/_components/_internal/CategoryPopup/CATEGORY_OPTIONS";
import { Button, Filter } from "@/components/common";
import { PopupLayout } from "@/components/domain";
import { useState } from "react";

interface NotificationBottomSheetProps {
  isOpen: boolean;
  onClose?: () => void;
}

const NotificationBottomSheet = ({ isOpen, onClose }: NotificationBottomSheetProps) => {
  return (
    <PopupLayout isOpen={isOpen} onClose={onClose}>
      <div className="w-full gap-6 px-5 py-10 flex-col-center">
        <h2 className="text-h2-medium text-layout-header-default">카테고리 키워드</h2>
        <div className="flex w-full flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((item) => {
            const [isFilterSelected, setIsFilterSelected] = useState(false);

            return (
              <Filter
                key={item.value}
                ariaLabel={item.label}
                onSelected={isFilterSelected}
                onClick={() => setIsFilterSelected(true)}
              >
                {item.label}
              </Filter>
            );
          })}
        </div>

        <Button className="w-full" onClick={onClose}>
          적용하기
        </Button>
      </div>
    </PopupLayout>
  );
};

export default NotificationBottomSheet;
