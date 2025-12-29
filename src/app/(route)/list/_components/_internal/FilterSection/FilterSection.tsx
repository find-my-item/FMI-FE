import { useState } from "react";
import { Filter } from "@/components";
import FilterBottomSheet from "../FilterBottomSheet/FilterBottomSheet";
import { CategoryFilterValue } from "@/types";

export type FilterTab = "region" | "category" | "sort" | "status";

const FilterSection = () => {
  const [filters, setFilters] = useState({
    region: "",
    category: "" as CategoryFilterValue,
    sort: "latest",
    status: "",
  });

  const [selectedTab, setSelectedTab] = useState<FilterTab>("region");
  const [isOpen, setIsOpen] = useState(false);

  const openSheet = (tab: FilterTab) => {
    setSelectedTab(tab);
    setIsOpen(true);
  };

  const filterButtons: { label: string; tab: FilterTab }[] = [
    { label: "카테고리", tab: "category" },
    { label: "최신순", tab: "sort" },
    { label: "찾는중", tab: "status" },
  ];

  return (
    <>
      <section
        aria-label="필터 영역"
        className="flex h-[67px] w-full items-center gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap px-5 no-scrollbar"
      >
        <Filter
          ariaLabel="지역 선택 필터 버튼"
          onSelected={false}
          icon={{ name: "Location", size: 16 }}
          className="flex-shrink-0"
          onClick={() => {
            openSheet("region");
          }}
        >
          지역 선택
        </Filter>

        {filterButtons.map(({ label, tab }) => (
          <Filter
            key={tab}
            ariaLabel={label}
            onSelected={false}
            iconPosition="trailing"
            icon={{ name: "ArrowDown", size: 12 }}
            className="flex-shrink-0"
            onClick={() => openSheet(tab)}
          >
            {label}
          </Filter>
        ))}
      </section>

      {isOpen && (
        <FilterBottomSheet
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    </>
  );
};

export default FilterSection;
