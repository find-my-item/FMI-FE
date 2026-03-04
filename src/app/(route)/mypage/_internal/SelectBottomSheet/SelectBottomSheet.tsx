"use client";

import { Button, Filter } from "@/components/common";
import { PopupLayout } from "@/components/domain";
import { applyFiltersToUrl } from "@/components/domain/FilterSectionBottomSheet/utils/applyFiltersToUrl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { ActivityFilterState } from "../../activity/_types/ActivityFilterType";
import { ActivityType } from "../../activity/_types/ActivityType";

interface SelectBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  option: readonly { value: ActivityType | undefined; label: string }[];
  filters: ActivityFilterState;
  setFilters: Dispatch<SetStateAction<ActivityFilterState>>;
}

const SelectBottomSheet = ({
  isOpen,
  onClose,
  title,
  option,
  filters,
  setFilters,
}: SelectBottomSheetProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleApply = () => {
    const qs = applyFiltersToUrl({
      filters,
      searchParams: new URLSearchParams(searchParams.toString()),
    });

    router.replace(qs ? `${pathname}?${qs}` : pathname);
    onClose();
  };

  return (
    <PopupLayout className="w-full px-5 py-10 flex-col-center" isOpen={isOpen} onClose={onClose}>
      <h2 className="text-h2-medium text-layout-header-default">{title}</h2>
      <div className="mt-8 flex w-full flex-wrap gap-x-2 gap-y-3">
        {option.map((item) => {
          // const isSelected = selectedCategories === item.value;
          return (
            <Filter
              key={`${item.label}-${item.value ?? "all"}`}
              ariaLabel={item.label}
              onSelected={filters.activity === item.value}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  activity: item.value,
                }))
              }
            >
              {item.label}
            </Filter>
          );
        })}
      </div>

      <Button className="mt-12 w-full" onClick={handleApply}>
        적용하기
      </Button>
    </PopupLayout>
  );
};

export default SelectBottomSheet;
