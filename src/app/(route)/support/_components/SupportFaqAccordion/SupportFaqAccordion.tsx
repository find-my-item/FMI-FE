"use client";

import { useState } from "react";
import { Chip, Icon } from "@/components/common";
import { cn } from "@/utils";

interface SupportFaqAccordionItemProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const SupportFaqAccordionItem = ({ isExpanded, onToggle }: SupportFaqAccordionItemProps) => {
  return (
    <li className="flex flex-col">
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-label="FAQ 질문 접기/펼치기"
        className="flex items-center gap-1 py-2"
        onClick={onToggle}
      >
        <div className="flex items-center gap-[5px] px-2">
          <div className={cn("transition-transform", isExpanded && "rotate-90")}>
            <Icon name="AccordionToggle" size={12} />
          </div>
          <Icon name="AccordionQMark" size={12} />
        </div>
        <p
          className={cn(
            "text-h3-medium text-layout-body-default",
            isExpanded && "text-layout-header-default"
          )}
        >
          질문 제목이 들어갑니다.
        </p>
      </button>

      {isExpanded && (
        <div className="flex flex-col gap-3 rounded-2xl p-4 bg-fill-neutral-subtle-default">
          <div className="inline-block">
            <Chip label="계정" type="brandSubtleHover" />
          </div>
          <p className="text-body1-medium text-layout-header-default">답변 영역입니다.</p>
        </div>
      )}
    </li>
  );
};

const SupportFaqAccordion = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) =>
    setExpandedIndex((prev) => (prev === index ? null : index));

  return (
    <ul className="flex flex-col gap-4 px-[20.5px]">
      {Array.from({ length: 6 }).map((_, index) => (
        <SupportFaqAccordionItem
          key={index}
          isExpanded={expandedIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </ul>
  );
};

export default SupportFaqAccordion;
