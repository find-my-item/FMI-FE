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
}

const Dropdown = ({ options, onSelect, placeholder = "선택해주세요." }: DropdownProps) => {
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
    <div ref={dropdownRef} className="relative inline-block min-w-[160px]">
      <div
        className="border border-gray-300 rounded px-3 py-2 cursor-pointer bg-white select-none flex justify-between items-center"
        onClick={() => setOpen((prev) => !prev)}
      >
        {selected ? selected.label : placeholder}
        <span>▼</span>
      </div>
      {open && (
        <div className="absolute top-full left-0 right-0 border border-gray-300 rounded bg-white z-10 mt-1 shadow">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-gray-400">No options</div>
          ) : (
            options.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "px-3 py-2 cursor-pointer hover:bg-gray-300 mouse-hover",
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
