"use client";
"use no memo";

import { useState } from "react";
import { Button, RadioOptionItem } from "@/components/common";
import { PopupLayout } from "@/components/domain";
import { CategoryType, NoticeCategory } from "@/types";
import { CATEGORY_OPTIONS, NOTICE_WRITE_CATEGORY_OPTIONS } from "@/constants";

interface CategoryPopupProps {
  mode?: "post" | "notice";
  isOpen: boolean;
  onClose: () => void;
  onSelect: (category: AllCategoryType) => void;
}

type AllCategoryType = CategoryType | NoticeCategory;

const CategoryPopup = ({ mode = "post", isOpen, onClose, onSelect }: CategoryPopupProps) => {
  const [selected, setSelected] = useState<AllCategoryType>();

  const categoryOptions = mode === "post" ? CATEGORY_OPTIONS : NOTICE_WRITE_CATEGORY_OPTIONS;

  const handleApply = () => {
    if (!selected) return;
    onSelect(selected);
  };

  return (
    <PopupLayout isOpen={isOpen} onClose={onClose} className="flex flex-col gap-12 px-5 py-10">
      <section className="flex flex-col gap-8">
        <h2 className="text-center text-h2-medium text-layout-header-default">카테고리 선택</h2>

        <div className="flex flex-col gap-[2px]">
          {categoryOptions.map((option) => (
            <RadioOptionItem
              key={option.value}
              option={option}
              selected={selected || ""}
              onChange={(value) => setSelected(value as AllCategoryType)}
              inputName="category"
            />
          ))}
        </div>
      </section>

      <Button type="button" className="min-h-11" disabled={!selected} onClick={handleApply}>
        적용하기
      </Button>
    </PopupLayout>
  );
};

export default CategoryPopup;
