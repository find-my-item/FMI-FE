import { Dispatch, SetStateAction } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/utils";
import { Button, Icon, PopupLayout } from "@/components";
import { FilterTab } from "./types";
import { tabs, categories, sort, status } from "./CONSTANTS";
import { applyFiltersToUrl } from "./applyFiltersToUrl";
import { FiltersState } from "../FilterSection/filtersStateType";

interface FilterBottomSheetProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedTab: FilterTab;
  setSelectedTab: (tab: FilterTab) => void;
  filters: FiltersState;
  setFilters: Dispatch<SetStateAction<FiltersState>>;
}

const FilterBottomSheet = ({
  isOpen,
  setIsOpen,
  selectedTab,
  setSelectedTab,
  filters,
  setFilters,
}: FilterBottomSheetProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleApply = () => {
    const qs = applyFiltersToUrl({
      filters,
      searchParams: new URLSearchParams(searchParams.toString()),
    });

    router.replace(qs ? `${pathname}?${qs}` : pathname);
    setIsOpen(false);
  };

  return (
    <PopupLayout isOpen={isOpen} onClose={() => setIsOpen(false)} className="min-h-[530px] py-10">
      <div className="w-full gap-6 flex-col-center">
        <h2 className="text-h2-medium text-layout-header-default">필터</h2>

        <div role="tablist" className="w-full flex-center">
          {tabs.map((tab) => {
            const isSelected = selectedTab === tab.value;

            return (
              <button
                key={tab.value}
                role="tab"
                aria-selected={isSelected}
                aria-label={`${tab.label} 필터`}
                className={cn(
                  "min-h-[60px] flex-1 text-[20px] font-semibold",
                  // TODO(지권): 디자인 토큰 변경
                  isSelected ? "border-b-2 border-[#1EB87B] text-[#1EB87B]" : "text-[#ADADAD]"
                )}
                onClick={() => setSelectedTab(tab.value)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

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
              value={filters.region}
              onChange={(e) => setFilters((prev) => ({ ...prev, region: e.target.value }))}
            />
            <button
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, region: "" }))}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              aria-label="지역 검색어 지우기"
            >
              <Icon name="Delete" size={16} className="text-gray-400" />
            </button>
          </div>
        )}

        {selectedTab === "category" && (
          <div role="radiogroup" aria-label="카테고리 선택" className="flex w-full flex-wrap gap-2">
            {categories.map((category) => (
              <ChipButton
                key={category.value || "all"}
                label={category.label}
                value={category.value}
                selected={filters.category === category.value}
                onSelect={() => setFilters((prev) => ({ ...prev, category: category.value }))}
              />
            ))}
          </div>
        )}

        {selectedTab === "sort" && (
          <div
            role="radiogroup"
            aria-label="정렬 방식 선택"
            className="flex w-full flex-wrap gap-2"
          >
            {sort.map((sortItem, index) => (
              <ChipButton
                key={index}
                label={sortItem.label}
                value={sortItem.value}
                selected={filters.sort === sortItem.value}
                onSelect={() => setFilters((prev) => ({ ...prev, sort: sortItem.value }))}
              />
            ))}
          </div>
        )}

        {selectedTab === "status" && (
          <div role="radiogroup" aria-label="상태 선택" className="flex w-full flex-wrap gap-2">
            {status.map((statusItem, index) => (
              <ChipButton
                key={index}
                label={statusItem.label}
                value={statusItem.value}
                selected={filters.status === statusItem.value}
                onSelect={() => setFilters((prev) => ({ ...prev, status: statusItem.value }))}
              />
            ))}
          </div>
        )}
      </div>

      <div className="h-[230px] w-full" />

      <Button className="w-full" onClick={handleApply}>
        적용하기
      </Button>
    </PopupLayout>
  );
};

export default FilterBottomSheet;

const ChipButton = ({
  label,
  value,
  selected,
  onSelect,
}: {
  label: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
}) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      tabIndex={selected ? 0 : -1}
      onClick={() => onSelect(value)}
      className={cn(
        "rounded-full px-[18px] py-2 text-body1-semibold",
        selected
          ? "text-white bg-fill-neutralInversed-normal-enteredSelected"
          : "text-neutralInversed-normal-default bg-fill-neutralInversed-normal-default"
      )}
    >
      {label}
    </button>
  );
};
