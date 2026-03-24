"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/common";
import { CATEGORY_OPTIONS } from "@/constants";
import { cn } from "@/utils";
import { useHandleClickOutside, useUpdatePosition } from "@/app/(route)/chat/hooks";
import HomeFilter from "../HomeFilter/HomeFilter";

interface CategoryFilterProps {
  ariaLabel: string;
  label: string;
  isSelected: boolean;
  selectedValue: string;
  onSelect: (value?: string) => void;
}

const CategoryFilter = ({
  ariaLabel,
  label,
  isSelected,
  selectedValue,
  onSelect,
}: CategoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useHandleClickOutside(isOpen, triggerRef, dropdownRef, setIsOpen);
  useUpdatePosition(isOpen, triggerRef, dropdownRef);

  const handleOptionClick = (value: string) => {
    const nextValue = selectedValue === value ? undefined : value;
    onSelect(nextValue);
    setIsOpen(false);
  };

  return (
    <>
      <div ref={triggerRef}>
        <HomeFilter
          ariaLabel={ariaLabel}
          onSelected={isSelected}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {label}
          <Icon name="ArrowDown" size={12} />
        </HomeFilter>
      </div>

      {isOpen &&
        createPortal(
          <div ref={dropdownRef} className="fixed z-50 flex flex-col">
            {CATEGORY_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={cn(
                  "glass-card w-full text-nowrap border border-white bg-flatGray-25/70 px-7 py-4 text-h3-medium text-neutral-normal-default transition-colors flex-center",
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

export default CategoryFilter;
