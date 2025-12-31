"use client";

import { DetailHeader, ListSearch } from "@/components";
import { useSearchUpdateQueryString } from "@/hooks";
import DefaultList from "../DefaultList/DefaultList";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const postLogin = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}:8080/auth/login`,
    {
      email: "test@example.com",
      password: "Test1234!",
    },
    {
      withCredentials: true,
    }
  );

  return response;
};
const usePostLogin = () => {
  return useMutation({
    mutationFn: postLogin,
  });
};

const fetchChatList = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}:8080/users/me/chats?size=10&sort=LATEST`,
    {
      withCredentials: true,
    }
  );

  return response;
};
const useFetchChatList = (enabled: boolean) => {
  return useQuery({
    queryKey: ["chatList"],
    queryFn: fetchChatList,
    enabled,
  });
};

const ListView = () => {
  const { mutate: postLogin, isSuccess: isLoginSuccess } = usePostLogin();
  const { searchMode, searchUpdateQuery } = useSearchUpdateQueryString();
  const { data } = useFetchChatList(isLoginSuccess);

  useEffect(() => {
    postLogin();
  }, []);

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
