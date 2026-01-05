"use client";

import { ListSearch } from "@/components/domain";
import { DetailHeader } from "@/components/layout";
import { useSearchUpdateQueryString } from "@/hooks";
import DefaultList from "../DefaultList/DefaultList";

const ListView = () => {
  const { searchMode, searchUpdateQuery } = useSearchUpdateQueryString();
  return (
    <div className="w-full">
      <DetailHeader title={searchMode === "region" ? "지역 선택" : "채팅"} />

      <h1 className="sr-only">채팅 목록 페이지</h1>
      {searchMode === "default" ? (
        <DefaultList searchUpdateQuery={searchUpdateQuery} />
      ) : (
        <ListSearch searchMode={searchMode} />
      )}
    </div>
  );
};

export default ListView;
