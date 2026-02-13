"use client";

import { useSearchUpdateQueryString } from "@/hooks";
import { DetailHeader } from "@/components/layout";
import { ListSearch } from "@/components/domain";
import DefaultList from "../DefaultList/DefaultList";
import { SEARCH_HEADER_TITLE } from "../../_constants/SEARCH_HEADER_TITLE";

const ListView = () => {
  const { searchMode, searchUpdateQuery } = useSearchUpdateQueryString();

  return (
    <>
      <DetailHeader title={SEARCH_HEADER_TITLE[searchMode]}>
        {searchMode === "default" && (
          <DetailHeader.Search
            ariaLabel="게시글 검색"
            onClick={() => searchUpdateQuery("search", "post")}
          />
        )}
      </DetailHeader>

      {searchMode === "default" ? (
        <DefaultList searchUpdateQuery={searchUpdateQuery} />
      ) : (
        <ListSearch searchMode={searchMode} />
      )}
    </>
  );
};

export default ListView;
