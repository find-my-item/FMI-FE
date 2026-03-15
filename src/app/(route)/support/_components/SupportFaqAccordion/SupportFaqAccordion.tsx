"use client";

import { Chip, Icon } from "@/components/common";
import { cn } from "@/utils";
import {
  FAQ_ITEMS,
  FaqItem,
  useSupportFaqAccordion,
  getFaqAnchorId,
  filterFaqItemsByTab,
} from "./_internal";
import { useSupportTabQuery } from "../SupportTab/_internal/useSupportTabQuery";
import { MouseEvent } from "react";
import Link from "next/link";

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
      <a
        href={`#${id}`}
        aria-label="FAQ 질문 접기/펼치기"
        aria-expanded={isExpanded}
        onClick={onAnchorClick}
        className="flex items-center gap-1 py-2"
      >
        <div className="flex items-center gap-[5px] px-2">
          <div className={cn("transition-all", isExpanded && "rotate-90")}>
            <Icon name="AccordionToggle" size={12} className={iconColor} />
          </div>
          <Icon name="AccordionQMark" size={12} className={iconColor} />
        </div>
        <p
          className={cn(
            "flex-1 text-h3-medium text-layout-body-default",
            isExpanded && "text-layout-header-default"
          )}
        >
          {item.question}
        </p>
      </a>

      {isExpanded && (
        <div className="flex flex-col gap-3 rounded-2xl p-4 bg-fill-neutral-subtle-default">
          <div className="inline-block">
            <Chip label={item.category} type="brandSubtleHover" />
          </div>
          <div className="flex flex-col gap-3 whitespace-pre-line text-body1-medium text-layout-header-default">
            {item.answer.map((segment, index) =>
              segment.type === "text" ? (
                <span key={index} className="block">
                  {segment.content}
                </span>
              ) : (
                <Link
                  key={index}
                  href={segment.href}
                  className="flex items-center gap-1 text-brand-strongUseThis-default"
                >
                  {segment.text}
                  <Icon
                    name="AccordionArrowRight"
                    size={12}
                    className="text-brand-strongUseThis-default"
                  />
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </li>
  );
};

const SupportFaqAccordion = () => {
  const { tab } = useSupportTabQuery();
  const { expandedId, handleToggle } = useSupportFaqAccordion();
  const filteredItems = filterFaqItemsByTab(FAQ_ITEMS, tab);

  return (
    <ul className="flex flex-col gap-4 px-[20.5px]">
      {filteredItems.map((item) => (
        <SupportFaqAccordionItem
          key={item.id}
          item={item}
          isExpanded={expandedId === item.id}
          onToggle={() => handleToggle(item.id)}
        />
      ))}
    </ul>
  );
};

export default SupportFaqAccordion;
