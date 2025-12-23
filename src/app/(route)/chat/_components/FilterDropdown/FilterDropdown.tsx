"use client";

import { Filter } from "@/components";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  ariaLabel: string;
  options: readonly FilterOption[];
  keyName: string;
  searchUpdateQuery: (key: string, value?: string) => void;
}

const SELECTED_TEXT = {
  oldest: "오래된순",
  latest: "최신순",
  all: "습득/분실",
  found: "습득물",
  lost: "분실물",
} as const;

const FilterDropdown = ({
  ariaLabel,
  options,
  keyName,
  searchUpdateQuery,
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const selectedSort = searchParams.get("sort");
  const selectedType = searchParams.get("type");

  const handleOptionClick = (value: string) => {
    searchUpdateQuery(keyName, value);
    setIsOpen(false);
  };

  const getDisplayText = () => {
    if (keyName === "sort") {
      const sortValue = selectedSort || "latest";
      return SELECTED_TEXT[sortValue as keyof typeof SELECTED_TEXT];
    } else {
      const typeValue = selectedType || "all";
      return SELECTED_TEXT[typeValue as keyof typeof SELECTED_TEXT];
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef}>
      <Filter
        ariaLabel={ariaLabel}
        onSelected={keyName === "sort" ? !!selectedSort : !!selectedType}
        icon={{ name: "ArrowDown", size: 12 }}
        iconPosition="trailing"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative"
      >
        {getDisplayText()}
      </Filter>
      {isOpen && (
        <div className="absolute z-50 mt-[8px] flex flex-col">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="glass-card w-full text-nowrap border border-white bg-[#F5F5F5]/70 px-[28px] py-[16px] text-left text-h3-medium text-neutral-normal-default transition-colors flex-center first:rounded-t-[20px] last:rounded-b-[20px]"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
