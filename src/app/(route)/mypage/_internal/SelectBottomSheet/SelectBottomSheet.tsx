"use client";

import { Button, Filter } from "@/components/common";
import { PopupLayout } from "@/components/domain";
import { FiltersStateType } from "@/components/domain/FilterSectionBottomSheet/_types/filtersStateType";
import { applyFiltersToUrl } from "@/components/domain/FilterSectionBottomSheet/utils/applyFiltersToUrl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface SelectBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  option: readonly { value: string | undefined; label: string }[];
  filters: FiltersStateType;
  setFilters: Dispatch<SetStateAction<FiltersStateType>>;
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

  // const [selectedCategories, setSelectedCategories] = useState<string>("");

  // const handleToggle = (value: string) => {
  //               onSelect={() => setFilters((prev) => ({ ...prev, category: category.value }))
  // };

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
        {option.map((activity) => {
          // const isSelected = selectedCategories === activity.value;
          return (
            <Filter
              key={`${activity.label}-${activity.value ?? "all"}`}
              ariaLabel={activity.label}
              onSelected={filters.activity === activity.value}
              // onClick={() => handleToggle(activity.value)}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  activity: activity.value as FiltersStateType["activity"],
                }))
              }
            >
              {activity.label}
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
