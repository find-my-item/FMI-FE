"use client";

import { DetailHeader, ListSearch } from "@/components";
import { useSearchUpdateQueryString } from "@/hooks";
import DefaultList from "../DefaultList/DefaultList";
import { useEffect } from "react";
import { useChatList } from "@/api/fetch/auth";
import useAppMutation from "@/api/_base/query/useAppMutation";

const ListView = () => {
  const { mutate: postLogin, isSuccess: isLoginSuccess } = useAppMutation(
    "auth",
    "auth/login",
    "post"
  );
  const { data: chatList } = useChatList(10, "LATEST", isLoginSuccess);
  const { searchMode, searchUpdateQuery } = useSearchUpdateQueryString();

  useEffect(() => {
    postLogin({ email: "test@example.com", password: "Test1234!" });
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
