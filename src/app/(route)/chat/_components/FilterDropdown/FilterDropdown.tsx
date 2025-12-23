"use client";

import { Filter } from "@/components";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

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

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideContainer = containerRef.current && !containerRef.current.contains(target);
      const isOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(target);

      if (isOutsideContainer && isOutsideDropdown) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      if (!containerRef.current || !dropdownRef.current) return;

      const { left, top, height } = containerRef.current.getBoundingClientRect();
      dropdownRef.current.style.left = `${left}px`;
      dropdownRef.current.style.top = `${top + height + 8}px`;
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

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
                className="glass-card w-full text-nowrap border border-white bg-[#F5F5F5]/70 px-[28px] py-[16px] text-left text-h3-medium text-neutral-normal-default transition-colors flex-center first:rounded-t-[20px] last:rounded-b-[20px]"
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
