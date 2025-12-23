"use client";

import { Filter } from "@/components";
import { createChatFilterButtons } from "../../_utils/createChatFilterButtons/createChatFilterButtons";
import ChatItem from "../ChatItem/ChatItem";
import { useSearchParams } from "next/navigation";
import { Props } from "@/components/common/Icon/Icon";

interface DefaultListProps {
  searchUpdateQuery: (key: string, value?: string) => void;
}

const DefaultList = ({ searchUpdateQuery }: DefaultListProps) => {
  const searchParams = useSearchParams();
  const selectedRegion = searchParams.get("region");
  const buttons = createChatFilterButtons(searchUpdateQuery);

  const renderButtons = buttons.map((btn) => {
    const isRegionButton = btn.text === "지역 선택";
    const isSelected = isRegionButton && !!selectedRegion;
    const displayText = isSelected ? selectedRegion : btn.text;

    return {
      ...btn,
      isSelected,
      displayText,
    };
  });

  return (
    <>
      <div className="px-[20px]">
        <div className="flex gap-[8px] py-[14px] no-scrollbar">
          {renderButtons.map(
            ({ text, icon, iconSize, iconPosition, onClick, isSelected, displayText }) => (
              <Filter
                key={text}
                ariaLabel={`채팅 리스트 ${displayText}`}
                onSelected={isSelected}
                icon={{ name: icon as Props["name"], size: iconSize }}
                iconPosition={iconPosition as "leading" | "trailing"}
                onClick={onClick}
              >
                {displayText}
              </Filter>
            )
          )}
        </div>
      </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <ChatItem key={index} />
      ))}
    </>
  );
};

export default DefaultList;
