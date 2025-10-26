"use client";

import { PopupLayout } from "@/components";
import { cn } from "@/utils/cn";
import { useState } from "react";

interface CategoryPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_OPTIONS = ["전자기기", "지갑", "신분증", "귀금속", "가방", "카드", "기타"] as const;

const CategoryPopup = ({ isOpen, onClose }: CategoryPopupProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <PopupLayout isOpen={isOpen} onClose={onClose} className="flex flex-col gap-12 px-5 py-10">
      <div className="flex flex-col gap-8">
        <h2 className="text-center text-[20px] tracking-[0.01em]">카테고리 선택</h2>
        <div className="flex flex-col gap-[2px]">
          {CATEGORY_OPTIONS.map((option) => (
            <label
              key={option}
              className={cn(
                "flex h-[61px] w-full cursor-pointer items-center gap-3 px-[20px] py-[18px] text-[18px] leading-[140%] text-[#5D5D5D]",
                "transition-colors hover:text-[#9D9D9D]"
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
                  "relative h-4 w-4 rounded-full border border-[#46C691]/70 peer-checked:border-[#1EB87B]",
                  "before:absolute before:inset-[3px] before:scale-0 before:rounded-full before:bg-[#1EB87B] before:transition-transform",
                  "peer-checked:before:scale-100"
                )}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
      <button
        className={cn(
          "w-full rounded-[10px] py-[10px] text-[16px] font-semibold transition-colors",
          selected ? "bg-[#1EB87B]/70 text-[#F6FFFC]" : "bg-[#98E3BD]/90 text-[#C2F1D4]"
        )}
      >
        적용하기
      </button>
    </PopupLayout>
  );
};

export default CategoryPopup;
