import { Dispatch, SetStateAction } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/utils";
import { Button, Icon } from "@/components/common";
import { PopupLayout } from "@/components/domain";
import {
  CategoryFilterValue,
  FilterTab,
  FindStatusFilterValue,
  SortFilterValue,
  StatusFilterValue,
  tabsType,
} from "../_types/types";
import { categories, sort, status, findStatus } from "../_constants/CONSTANTS";
import { applyFiltersToUrl } from "../utils/applyFiltersToUrl";
import { FiltersStateType } from "../_types/filtersStateType";
import { TABS } from "../_constants/TABS";

interface FilterBottomSheetProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedTab: FilterTab;
  setSelectedTab: (tab: FilterTab) => void;
  filters: FiltersStateType;
  setFilters: Dispatch<SetStateAction<FiltersStateType>>;
  pageType?: tabsType;
}

const FilterBottomSheet = ({
  isOpen,
  setIsOpen,
  selectedTab,
  setSelectedTab,
  filters,
  setFilters,
  pageType = "LIST",
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

  //새로 추가 되는 코드
  const currentTabs = TABS[pageType];

  return (
    <PopupLayout isOpen={isOpen} onClose={() => setIsOpen(false)} className="min-h-[530px] py-10">
      <div className="w-full gap-6 flex-col-center">
        <h2 className="text-h2-medium text-layout-header-default">필터</h2>

        <section role="tablist" className="w-full flex-center">
          {currentTabs.map((tab) => {
            const isSelected = selectedTab === tab.value;

            return (
              <button
                key={tab.value}
                role="tab"
                aria-selected={isSelected}
                aria-label={`${tab.label} 필터`}
                className={cn(
                  "min-h-[60px] flex-1 text-[20px] font-semibold",
                  isSelected
                    ? "border-b-2 border-brand-normal-default text-brand-normal-default"
                    : "text-system-unselected"
                )}
                onClick={() => setSelectedTab(tab.value)}
              >
                {tab.label}
              </button>
            );
          })}
        </section>

        {/* 지역선택 */}
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

        {/* 카테고리 선택 */}
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

        {/* 정렬 선택 - 최신순, 오래된순 ... */}
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

        {/* 찾음 여부 상태 */}
        {selectedTab === "findStatus" && (
          <div
            role="radiogroup"
            aria-label="찾음 상태 선택"
            className="flex w-full flex-wrap gap-2"
          >
            {findStatus.map((findStatusItem, index) => (
              <ChipButton
                key={index}
                label={findStatusItem.label}
                value={findStatusItem.value}
                selected={filters.status === findStatusItem.value}
                onSelect={() =>
                  setFilters((prev) => ({ ...prev, findStatus: findStatusItem.value }))
                }
              />
            ))}
          </div>
        )}

        {/* 분류 상태 */}
        {selectedTab === "status" && (
          <div
            role="radiogroup"
            aria-label="분류 상태 선택"
            className="flex w-full flex-wrap gap-2"
          >
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

      <Button role="button" ariaLabel="필터 적용" className="w-full" onClick={handleApply}>
        적용하기
      </Button>
    </PopupLayout>
  );
};

export default FilterBottomSheet;

type ChipValue = SortFilterValue | CategoryFilterValue | StatusFilterValue | FindStatusFilterValue;

const ChipButton = ({
  label,
  value,
  selected,
  onSelect,
}: {
  label: string;
  value: ChipValue;
  selected: boolean;
  onSelect: (value: ChipValue) => void;
}) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-pressed={selected}
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
