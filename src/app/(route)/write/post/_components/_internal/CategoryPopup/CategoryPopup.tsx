"use client";
"use no memo";

import { useState } from "react";
import { cn } from "@/utils";
import { Button, RadioOptionItem } from "@/components/common";
import { PopupLayout } from "@/components/domain";
import { CategoryType } from "@/types";
import { CATEGORY_OPTIONS } from "@/constants";

interface CategoryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (category: CategoryType) => void;
}

const CategoryPopup = ({ isOpen, onClose, onSelect }: CategoryPopupProps) => {
  const [selected, setSelected] = useState<CategoryType>("" as CategoryType);

  const handleApply = () => {
    if (!selected) return;
    onSelect(selected);
  };

  return (
    <PopupLayout isOpen={isOpen} onClose={onClose} className="flex flex-col gap-12 px-5 py-10">
      <section className="flex flex-col gap-8">
        <h2 className="text-center text-h2-medium text-layout-header-default">카테고리 선택</h2>

        <div className="flex flex-col gap-[2px]">
          {CATEGORY_OPTIONS.map((option) => (
            <RadioOptionItem
              key={option.value}
              option={option}
              selected={selected}
              setSelected={(value) => setSelected(value as CategoryType)}
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
