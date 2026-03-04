"use client";

import { Chip, Icon } from "@/components/common";
import { cn } from "@/utils";
import { MOCK_FAQ_ITEMS, FaqItem, useSupportFaqAccordion, getFaqAnchorId } from "./_internal";
import { MouseEvent } from "react";

interface SupportFaqAccordionItemProps {
  item: FaqItem;
  isExpanded: boolean;
  onToggle: () => void;
}

const SupportFaqAccordionItem = ({ item, isExpanded, onToggle }: SupportFaqAccordionItemProps) => {
  const iconColor = isExpanded ? "text-layout-header-default" : "text-labelsVibrant-tertiary";
  const id = getFaqAnchorId(item.id);

  const onAnchorClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onToggle();
    if (isExpanded) return;
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  };

  return (
    <li id={id} className="flex scroll-mt-14 flex-col">
      <div className="flex items-center gap-1 py-2">
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-label="FAQ 질문 접기/펼치기"
          className="flex items-center gap-[5px] px-2"
          onClick={onToggle}
        >
          <div className={cn("transition-all", isExpanded && "rotate-90")}>
            <Icon name="AccordionToggle" size={12} className={iconColor} />
          </div>
          <Icon name="AccordionQMark" size={12} className={iconColor} />
        </button>
        <a href={`#${id}`} onClick={onAnchorClick}>
          <p
            className={cn(
              "flex-1 text-left text-h3-medium text-layout-body-default",
              isExpanded && "text-layout-header-default"
            )}
          >
            {item.question}
          </p>
        </a>
      </div>
      {isExpanded && (
        <div className="flex flex-col gap-3 rounded-2xl p-4 bg-fill-neutral-subtle-default">
          <div className="inline-block">
            <Chip label={item.category} type="brandSubtleHover" />
          </div>
          <p className="text-body1-medium text-layout-header-default">{item.answer}</p>
        </div>
      )}
    </li>
  );
};

const SupportFaqAccordion = () => {
  const { expandedIndex, handleToggle } = useSupportFaqAccordion();

  return (
    <ul className="flex flex-col gap-4 px-[20.5px]">
      {MOCK_FAQ_ITEMS.map((item, index) => (
        <SupportFaqAccordionItem
          key={item.id}
          item={item}
          isExpanded={expandedIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </ul>
  );
};

export default SupportFaqAccordion;
