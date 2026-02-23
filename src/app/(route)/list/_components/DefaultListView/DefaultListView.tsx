"use client";

import { useSearchUpdateQueryString } from "@/hooks";
import { DetailHeader } from "@/components/layout";
import DefaultListSection from "../DefaultListSection/DefaultListSection";
import { SEARCH_HEADER_TITLE } from "../../_constants/SEARCH_HEADER_TITLE";
import { HeaderSearch } from "@/components/layout/DetailHeader/DetailHeaderParts";
import DefaultListSearch from "../DefaultListSearch/DefaultListSearch";

const DefaultListView = () => {
  const { searchMode, searchUpdateQuery } = useSearchUpdateQueryString();
  const isDefaultMode = searchMode === "default";

  return (
    <>
      <DetailHeader title={SEARCH_HEADER_TITLE[searchMode]}>
        {isDefaultMode && (
          <HeaderSearch
            ariaLabel="게시글 검색"
            onClick={() => searchUpdateQuery("search", "post")}
          />
        )}
      </DetailHeader>

      {isDefaultMode ? (
        <DefaultListSection searchUpdateQuery={searchUpdateQuery} />
      ) : (
        <DefaultListSearch />
      )}
    </>
  );
};

export default DefaultListView;
