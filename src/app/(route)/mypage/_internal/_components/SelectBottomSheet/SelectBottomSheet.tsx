"use client";

import { Button, Filter } from "@/components/common";
import { PopupLayout } from "@/components/domain";
import { useState } from "react";

interface SelectBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  option: readonly { value: string; label: string }[];
}

const SelectBottomSheet = ({ isOpen, onClose, title, option }: SelectBottomSheetProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleToggle = (value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <PopupLayout className="w-full px-5 py-10 flex-col-center" isOpen={isOpen} onClose={onClose}>
      <h2 className="text-h2-medium text-layout-header-default">{title}</h2>
      <div className="mt-8 flex w-full flex-wrap gap-x-2 gap-y-3">
        {option.map((item) => {
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
    </PopupLayout>
  );
};

export default SelectBottomSheet;
