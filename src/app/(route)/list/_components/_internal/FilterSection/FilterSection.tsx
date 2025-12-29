import { Filter } from "@/components";
import { Dispatch, SetStateAction, useState } from "react";
import FilterBottomSheet from "../FilterBottomSheet/FilterBottomSheet";

interface FilterSectionProps {
  searchUpdateQuery: (key: string, value?: string) => void;
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

const FilterSection = ({ searchUpdateQuery, filters, setFilters }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
          onClick={() => searchUpdateQuery("search", "region")}
          className="flex-shrink-0"
        >
          지역 선택
        </Filter>

        {["카테고리", "최신순", "찾는중"].map((item) => (
          <Filter
            key={item}
            ariaLabel={item}
            onSelected={false}
            iconPosition="trailing"
            icon={{ name: "ArrowDown", size: 12 }}
            className="flex-shrink-0"
            onClick={() => setIsOpen(true)}
          >
            {item}
          </Filter>
        ))}
      </section>

      {isOpen && <FilterBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default FilterSection;
