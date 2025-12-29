import { Dispatch, SetStateAction } from "react";
import { cn } from "@/utils";
import { Button, Icon, PopupLayout } from "@/components";
import { FilterTab } from "../FilterSection/FilterSection";

interface FilterBottomSheetProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedTab: FilterTab;
  setSelectedTab: (tab: FilterTab) => void;
  filters: {
    region: string;
    category: string;
    sort: string;
    status: string;
  };
  setFilters: Dispatch<
    SetStateAction<{ region: string; category: string; sort: string; status: string }>
  >;
}

const styles = {
  baseButton: "min-h-[60px] flex-1 font-semibold text-[20px]",
  selectedButton: "border-b-2 border-[#1EB87B] text-[#1EB87B]",
  unselectedButton: "text-[#ADADAD]",
};

const tabs: { label: string; value: FilterTab }[] = [
  { label: "지역", value: "region" },
  { label: "카테고리", value: "category" },
  { label: "정렬", value: "sort" },
  { label: "찾음여부", value: "status" },
];

const FilterBottomSheet = ({
  isOpen,
  setIsOpen,
  selectedTab,
  setSelectedTab,
}: FilterBottomSheetProps) => {
  return (
    <PopupLayout isOpen={isOpen} onClose={() => setIsOpen(false)} className="min-h-[530px] py-10">
      <div className="w-full gap-6 flex-col-center">
        <h2 className="text-h2-medium text-layout-header-default">필터</h2>

        <section role="tablist" className="w-full flex-center">
          {tabs.map((tab) => {
            const isSelected = selectedTab === tab.value;

            return (
              <button
                key={tab.value}
                role="tab"
                aria-selected={isSelected}
                className={cn(
                  styles.baseButton,
                  isSelected ? styles.selectedButton : styles.unselectedButton
                )}
                onClick={() => setSelectedTab(tab.value)}
              >
                {tab.label}
              </button>
            );
          })}
        </section>

        {/* 콘텐츠 영역 */}
        {selectedTab === "region" && (
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
        )}

        {selectedTab === "category" && (
          <div className="w-full text-sm text-gray-500">카테고리 필터 UI</div>
        )}

        {selectedTab === "sort" && <div className="w-full text-sm text-gray-500">정렬 필터 UI</div>}

        {selectedTab === "status" && (
          <div className="w-full text-sm text-gray-500">찾음 여부 필터 UI</div>
        )}
      </div>

      <div className="h-[230px] w-full" />

      <Button className="w-full" onClick={() => setIsOpen(false)}>
        적용하기
      </Button>
    </PopupLayout>
  );
};

export default FilterBottomSheet;
