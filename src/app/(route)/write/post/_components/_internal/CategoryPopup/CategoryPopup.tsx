"use client";

import { useState } from "react";
import { cn } from "@/utils";
import { Button } from "@/components/common";
import { PopupLayout } from "@/components/domain";

interface CategoryPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

// TODO(지권): API 연동 후 상수 제거
const CATEGORY_OPTIONS = ["전자기기", "지갑", "신분증", "귀금속", "가방", "카드", "기타"] as const;

const CategoryPopup = ({ isOpen, onClose }: CategoryPopupProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <PopupLayout isOpen={isOpen} onClose={onClose} className="flex flex-col gap-12 px-5 py-10">
      <section className="flex flex-col gap-8">
        <h2 className="text-center text-h2-medium text-layout-header-default">카테고리 선택</h2>

        <div className="flex flex-col gap-[2px]">
          {CATEGORY_OPTIONS.map((option) => (
            <label
              key={option}
              aria-checked={selected === option}
              className={cn(
                "flex h-[61px] w-full cursor-pointer items-center gap-3 px-5 py-[18px] text-h3-medium text-neutral-normal-default",
                selected === option && "rounded-[4px] bg-fill-neutral-strong-default"
              )}
            >
              <input
                type="radio"
                name="category"
                value={option}
                checked={selected === option}
                onChange={(e) => setSelected(e.target.value)}
                className="peer hidden"
              />
              <span
                className={cn(
                  "relative h-4 w-4 rounded-full border border-brand-normal-enteredSelected peer-checked:border-brand-normal-enteredSelected",
                  "before:absolute before:inset-[3px] before:scale-0 before:rounded-full before:transition-transform before:bg-fill-brand-normal-enteredSelected",
                  "peer-checked:before:scale-100"
                )}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </section>

      <Button type="button" className="min-h-11" disabled={!selected} onClick={onClose}>
        적용하기
      </Button>
    </PopupLayout>
  );
};

export default CategoryPopup;
