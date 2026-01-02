"use client";

import { Filter } from "@/components";
import ChatItem from "../ChatItem/ChatItem";
import { useSearchParams } from "next/navigation";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import { FilTER_DROPDOWN_OPTIONS } from "../../constants/FILTER";
import { useChatList } from "@/api/fetch/auth";
import { useEffect } from "react";
import useAppMutation from "@/api/_base/query/useAppMutation";

interface DefaultListProps {
  searchUpdateQuery: (key: string, value?: string) => void;
}

const DefaultList = ({ searchUpdateQuery }: DefaultListProps) => {
  const searchParams = useSearchParams();
  const selectedRegion = searchParams.get("region");
  const displayText = selectedRegion || "지역 선택";
  const { mutate: postLogin, isSuccess: isLoginSuccess } = useAppMutation(
    "auth",
    "auth/login",
    "post"
  );
  const { data: chatList } = useChatList(10, "LATEST", isLoginSuccess);

  useEffect(() => {
    postLogin({ email: "znznun@gmail.com", password: "Khj1234!" });
  }, []);

  return (
    <>
      <div className="flex gap-2 px-5 py-[14px] no-scrollbar">
        <Filter
          ariaLabel={`채팅 리스트 ${displayText}`}
          onSelected={!!selectedRegion}
          icon={{ name: "Location", size: 16 }}
          iconPosition="leading"
          onClick={() => searchUpdateQuery("search", "region")}
        >
          {displayText}
        </Filter>
        {FilTER_DROPDOWN_OPTIONS.map((option) => (
          <FilterDropdown key={option.keyName} {...option} searchUpdateQuery={searchUpdateQuery} />
        ))}
      </div>
      {chatList?.result?.chatRooms?.map((chatRoom) => (
        <ChatItem key={chatRoom.roomId} chatRoom={chatRoom} />
      ))}
    </>
  );
};

export default DefaultList;
