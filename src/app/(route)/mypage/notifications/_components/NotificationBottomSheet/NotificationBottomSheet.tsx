"use client";

import { CATEGORY_OPTIONS } from "@/app/(route)/write/post/_components/_internal/CategoryPopup/CATEGORY_OPTIONS";
import { Button, Filter } from "@/components/common";
import { PopupLayout } from "@/components/domain";
import { useState } from "react";

interface NotificationBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationBottomSheet = ({ isOpen, onClose }: NotificationBottomSheetProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleToggle = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <PopupLayout isOpen={isOpen} onClose={onClose}>
      <div className="w-full px-5 py-10 flex-col-center">
        <h2 className="text-h2-medium text-layout-header-default">카테고리 키워드</h2>
        <div className="mt-8 flex w-full flex-wrap gap-x-2 gap-y-3">
          {CATEGORY_OPTIONS.map((item) => {
            const isSelected = selectedCategories.includes(item.value);

            return (
              <Filter
                key={item.value}
                ariaLabel={item.label}
                onSelected={isSelected}
                onClick={() => handleToggle(item.value)}
              >
                {item.label}
              </Filter>
            );
          })}
        </div>

        <Button className="mt-12 w-full" onClick={onClose}>
          적용하기
        </Button>
      </div>
    </PopupLayout>
  );
};

export default NotificationBottomSheet;
