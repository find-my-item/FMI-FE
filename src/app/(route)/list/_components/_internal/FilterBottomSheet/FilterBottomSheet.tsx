import { Dispatch, SetStateAction } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/utils";
import { CategoryFilterValue, StatusFilterValue } from "@/types";
import { Button, Icon, PopupLayout } from "@/components";
import { FilterTab } from "./types";
import { tabs, categories, sort, status } from "./CONSTANTS";

interface FilterBottomSheetProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedTab: FilterTab;
  setSelectedTab: (tab: FilterTab) => void;
  filters: {
    region: string;
    category: CategoryFilterValue;
    sort: string;
    status: StatusFilterValue;
  };
  setFilters: Dispatch<
    SetStateAction<{
      region: string;
      category: CategoryFilterValue;
      sort: string;
      status: StatusFilterValue;
    }>
  >;
}

const categoryToQueryValue = (category: CategoryFilterValue | "") => {
  if (!category) return "";

  const map: Record<CategoryFilterValue, string> = {
    "": "",
    ELECTRONICS: "electronics",
    WALLET: "wallet",
    ID_CARD: "id-card",
    JEWELRY: "jewelry",
    BAG: "bag",
    CARD: "card",
    ETC: "etc",
  };

  return map[category];
};

const FilterBottomSheet = ({
  isOpen,
  setIsOpen,
  selectedTab,
  setSelectedTab,
  filters,
  setFilters,
}: FilterBottomSheetProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const applyFiltersToUrl = () => {
    const params = new URLSearchParams(searchParams.toString());

    const upsert = (key: string, value: string) => {
      if (!value) params.delete(key);
      else params.set(key, value);
    };

    upsert("region", filters.region);
    upsert("category", categoryToQueryValue(filters.category));
    upsert("sort", filters.sort);
    upsert("status", filters.status);

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);

    setIsOpen(false);
  };

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
                  "min-h-[60px] flex-1 text-[20px] font-semibold",
                  isSelected ? "border-b-2 border-[#1EB87B] text-[#1EB87B]" : "text-[#ADADAD]"
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
          <div className="flex w-full flex-wrap gap-2">
            {categories.map((category) => (
              <ChipButton
                key={category.value || "all"}
                label={category.label}
                value={category.value}
                selected={filters.category === category.value}
                onSelect={(v) => setFilters((prev) => ({ ...prev, category: category.value }))}
              />
            ))}
          </div>
        )}

        {selectedTab === "sort" && (
          <div className="flex w-full flex-wrap gap-2">
            {sort.map((item, index) => (
              <ChipButton
                key={index}
                label={item.label}
                value={item.value}
                selected={filters.sort === item.value}
                onSelect={(v) => setFilters((prev) => ({ ...prev, sort: v }))}
              />
            ))}
          </div>
        )}

        {selectedTab === "status" && (
          <div className="flex w-full flex-wrap gap-2">
            {status.map((item, index) => (
              <ChipButton
                key={index}
                label={item.label}
                value={item.value}
                selected={filters.status === item.value}
                onSelect={() => setFilters((prev) => ({ ...prev, status: item.value }))}
              />
            ))}
          </div>
        )}
      </div>

      <div className="h-[230px] w-full" />

      <Button className="w-full" onClick={applyFiltersToUrl}>
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
      onClick={() => onSelect(value)}
      className={cn(
        "rounded-full px-[18px] py-2 text-body1-semibold",
        selected
          ? "text-white bg-fill-neutralInversed-normal-enteredSelected"
          : "text-neutralInversed-normal-default bg-fill-neutralInversed-normal-default"
      )}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
};
