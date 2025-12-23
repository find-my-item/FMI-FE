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

const selectedText = {
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
      return selectedText[sortValue as keyof typeof selectedText];
    } else {
      const typeValue = selectedType || "all";
      return selectedText[typeValue as keyof typeof selectedText];
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
        <div className="absolute z-50 mt-1 flex min-w-[120px] flex-col rounded-lg border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="w-full px-4 py-2 text-left first:rounded-t-lg last:rounded-b-lg hover:bg-gray-100"
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
