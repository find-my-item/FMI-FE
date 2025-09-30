"use client";

import { cn } from "@/utils/cn";
import { useState, useRef, useEffect } from "react";

type DropdownOption = {
  label: string;
  value: string;
};

interface DropdownProps {
  options: DropdownOption[];
  onSelect: (value: string) => void;
  placeholder?: string;
  children: React.ReactNode;
  className?: string;
}

const Dropdown = ({ options, onSelect, children, className }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownOption | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleSelect = (option: DropdownOption) => {
    setSelected(option);
    setOpen(false);
    onSelect(option.value);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <div
        className={cn(
          "flex cursor-pointer select-none items-center justify-between rounded-full bg-[#F5F5F5] px-3 py-2",
          className
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        {children}
      </div>
      {open && (
        <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded border border-gray-300 bg-white shadow">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-gray-400">No options</div>
          ) : (
            options.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "mouse-hover cursor-pointer px-3 py-2 hover:bg-gray-300",
                  selected?.value === option.value && "bg-gray-100"
                )}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
