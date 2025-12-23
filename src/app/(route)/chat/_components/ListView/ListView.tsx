"use client";

import { DetailHeader, ListSearch } from "@/components";
import { useSearchUpdateQueryString } from "@/hooks";
import DefaultList from "../DefaultList/DefaultList";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ6bnpudW5AZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJ1c2VySWQiOjMsImlzcyI6ImZtaSIsImlhdCI6MTc2NjA2NzQ1OCwiZXhwIjoxNzY2MDY4MzU4fQ.OM1s8f--NBoQRf89wc6PJrbkxbD3oQ0jMOBj0TuuRYw";

const fetchChatList = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}:8080/users/me/chats?size=10&sort=LATEST`,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  return response;
};
const useFetchChatList = () => {
  return useQuery({
    queryKey: ["chatList"],
    queryFn: fetchChatList,
  });
};

const ListView = () => {
  const { searchMode, searchUpdateQuery } = useSearchUpdateQueryString();
  const { data } = useFetchChatList();

  return (
    <div className="w-full">
      <DetailHeader title={searchMode === "region" ? "지역 선택" : "채팅"} />
      {searchMode === "default" ? (
        <DefaultList searchUpdateQuery={searchUpdateQuery} />
      ) : (
        <ListSearch searchMode={searchMode} />
      )}
    </div>
  );
};

export default ListView;
