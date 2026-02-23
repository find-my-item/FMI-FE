"use client";

import { useSearchUpdateQueryString } from "@/hooks";
import { DetailHeader } from "@/components/layout";
import DefaultListSection from "../DefaultListSection/DefaultListSection";
import { SEARCH_HEADER_TITLE } from "../../_constants/SEARCH_HEADER_TITLE";
import { HeaderSearch } from "@/components/layout/DetailHeader/DetailHeaderParts";
import { ErrorBoundary } from "@/app/ErrorBoundary";
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
        <ErrorBoundary toastMessage="목록을 불러올 수 없어요. 다시 시도해 주세요.">
          <DefaultListSection searchUpdateQuery={searchUpdateQuery} />
        </ErrorBoundary>
      ) : (
        <DefaultListSearch />
      )}
    </>
  );
};

export default DefaultListView;
