"use client";

import { Filter } from "@/components/common";
import { useClickOutside } from "@/hooks";
import { cn } from "@/utils";
import { useRef, useState } from "react";

const FILTER_OPTIONS = [
  { label: "최신순", value: "LATEST" },
  { label: "오래된순", value: "OLDEST" },
];

const NoticeFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const outerRef = useClickOutside(() => setIsOpen(false));
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={outerRef} className="relative inline-block px-5 py-[14px]">
      <Filter
        ariaLabel="공지사항 검색"
        onSelected={false}
        onClick={() => setIsOpen((prev) => !prev)}
        icon={{ name: "ArrowDown", size: 12 }}
        iconPosition="trailing"
      >
        최신순
      </Filter>
      {isOpen && (
        <div ref={dropdownRef} className="absolute top-[60px] z-50 flex flex-col">
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {}}
              className={cn(
                "glass-card w-full text-nowrap border border-white bg-flatGray-25/70 px-7 py-4 text-left text-h3-medium text-neutral-normal-default transition-colors flex-center",
                "first:rounded-t-[20px] last:rounded-b-[20px]"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoticeFilter;
