"use client";

import { Filter } from "@/components/common";
import ChatItem from "../ChatItem/ChatItem";
import { useSearchParams } from "next/navigation";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import { FilTER_DROPDOWN_OPTIONS } from "../../constants/FILTER";
import { useChatList } from "@/api/fetch/auth";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll/useInfiniteScroll";

interface DefaultListProps {
  searchUpdateQuery: (key: string, value?: string) => void;
}

const DefaultList = ({ searchUpdateQuery }: DefaultListProps) => {
  const searchParams = useSearchParams();
  const selectedRegion = searchParams.get("region");
  const regionDisplayText = selectedRegion || "지역 선택";
  const { data: chatList, fetchNextPage, isFetchingNextPage, hasNextPage } = useChatList();
  const { ref: chatListRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <>
      <div className="flex gap-2 px-5 py-[14px] no-scrollbar">
        <Filter
          ariaLabel={`채팅 리스트 ${regionDisplayText}`}
          onSelected={!!selectedRegion}
          icon={{ name: "Location", size: 16 }}
          iconPosition="leading"
          onClick={() => searchUpdateQuery("search", "region")}
        >
          {regionDisplayText}
        </Filter>
        {FilTER_DROPDOWN_OPTIONS.map((option) => (
          <FilterDropdown key={option.keyName} {...option} searchUpdateQuery={searchUpdateQuery} />
        ))}
      </div>
      {chatList?.map((chatRoom) => (
        <ChatItem key={chatRoom.roomId} chatRoom={chatRoom} />
      ))}
      <div ref={chatListRef} className="h-[100px]" />
    </>
  );
};

export default DefaultList;
