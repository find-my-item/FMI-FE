"use client";

import { Filter } from "@/components";
import ChatItem from "../ChatItem/ChatItem";
import { useSearchParams } from "next/navigation";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import { FilTER_DROPDOWN_OPTIONS } from "../../constants/FILTER";

interface DefaultListProps {
  searchUpdateQuery: (key: string, value?: string) => void;
}

const DefaultList = ({ searchUpdateQuery }: DefaultListProps) => {
  const searchParams = useSearchParams();
  const selectedRegion = searchParams.get("region");
  const displayText = selectedRegion || "지역 선택";

  return (
    <>
      <div className="px-[20px]">
        <div className="flex gap-[8px] py-[14px] no-scrollbar">
          <Filter
            ariaLabel={`채팅 리스트 ${displayText}`}
            onSelected={!!selectedRegion}
            icon={{ name: "Location", size: 16 }}
            iconPosition="leading"
            onClick={() => searchUpdateQuery("search", "region")}
          >
            {displayText}
          </Filter>
          {FilTER_DROPDOWN_OPTIONS.map((option) => (
            <FilterDropdown
              key={option.keyName}
              {...option}
              searchUpdateQuery={searchUpdateQuery}
            />
          ))}
        </div>
      </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <ChatItem key={index} />
      ))}
    </>
  );
};

export default DefaultList;
