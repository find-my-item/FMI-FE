"use client";

import { Filter, InputSearch } from "@/components";
import { FormProvider, useForm } from "react-hook-form";
import { createChatFilterButtons } from "../../_utils/createChatFilterButtons/createChatFilterButtons";
import ChatItem from "../ChatItem/ChatItem";
import { Props } from "@/components/Icon/Icon";
import { useSearchParams } from "next/navigation";

interface DefaultListProps {
  searchUpdateQuery: (key: string, value?: string) => void;
}

const DefaultList = ({ searchUpdateQuery }: DefaultListProps) => {
  const searchParams = useSearchParams();
  const selectedRegion = searchParams.get("region");
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
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
        <FormProvider {...methods}>
          <div className="py-[10px]">
            <InputSearch
              mode="RHF"
              name="chatListSearch"
              placeholder="채팅 참여자를 입력해 주세요."
              onEnter={() => {}}
            />
          </div>
        </FormProvider>

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
