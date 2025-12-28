"use client";

import { Filter } from "@/components";
import { useSearchParams } from "next/navigation";
import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { SELECTED_TEXT } from "../../constants/SELECTED_TEXT";
import { cn } from "@/utils";
import { useHandleClickOutside, useUpdatePosition } from "../../hooks";

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

const FilterDropdown = ({
  ariaLabel,
  options,
  keyName,
  searchUpdateQuery,
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  useHandleClickOutside(isOpen, containerRef, dropdownRef, setIsOpen);
  useUpdatePosition(isOpen, containerRef, dropdownRef);
  const selectedValue = searchParams.get(keyName);
  const displayText =
    SELECTED_TEXT[
      (selectedValue || (keyName === "sort" ? "latest" : "all")) as keyof typeof SELECTED_TEXT
    ];
  const isSelected = !!selectedValue;

  const handleOptionClick = (value: string) => {
    searchUpdateQuery(keyName, value);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <>
      <div ref={containerRef}>
        <Filter
          ariaLabel={ariaLabel}
          onSelected={isSelected}
          icon={{ name: "ArrowDown", size: 12 }}
          iconPosition="trailing"
          onClick={toggleDropdown}
        >
          {displayText}
        </Filter>
      </div>
      {isOpen &&
        createPortal(
          <div ref={dropdownRef} className="fixed z-50 flex flex-col">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={cn(
                  "glass-card w-full text-nowrap border border-white bg-flatGray-25/70 px-7 py-4 text-left text-h3-medium text-neutral-normal-default transition-colors flex-center",
                  "first:rounded-t-[20px] last:rounded-b-[20px]"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export default FilterDropdown;
