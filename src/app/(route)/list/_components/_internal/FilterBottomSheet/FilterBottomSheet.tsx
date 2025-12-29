import { Button, Icon, InputSearch, PopupLayout } from "@/components";
import { cn } from "@/utils";
import { useState } from "react";

interface FilterBottomSheetProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const styles = {
  baseButton: "min-h-[60px] flex-1 font-semibold text-[20px]",
  selectedButton: "border-b-2 border-[#1EB87B] text-[#1EB87B]",
  unselectedButton: "text-[#ADADAD]",
};

const buttons = ["지역", "카테고리", "정렬", "찾음여부"];

const FilterBottomSheet = ({ isOpen, setIsOpen }: FilterBottomSheetProps) => {
  const [selectedButton, setSelectedButton] = useState("지역");

  return (
    <PopupLayout isOpen={isOpen} onClose={() => setIsOpen(false)} className="py-10">
      <div className="w-full gap-6 flex-col-center">
        <h2 className="text-h2-medium text-layout-header-default">필터</h2>
        <section className="w-full flex-center">
          {buttons.map((item) => (
            <button
              key={item}
              className={cn(
                styles.baseButton,
                selectedButton === item ? styles.selectedButton : styles.unselectedButton
              )}
              onClick={() => setSelectedButton(item)}
              aria-selected={selectedButton === item}
              role="tab"
              tabIndex={selectedButton === item ? 0 : -1}
              aria-controls={selectedButton === item ? "content" : undefined}
              aria-expanded={selectedButton === item}
            >
              {item}
            </button>
          ))}
        </section>
        <div className="relative w-full">
          <Icon
            name="Search"
            size={16}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            className="w-full rounded-full px-5 py-[10px] pl-10 bg-fill-neutral-subtle-default"
            placeholder="검색어를 입력하세요"
          />
          <Icon
            name="Delete"
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
      <div className="h-[230px] w-full"></div>
      <Button className="w-full">적용하기</Button>
    </PopupLayout>
  );
};

export default FilterBottomSheet;
