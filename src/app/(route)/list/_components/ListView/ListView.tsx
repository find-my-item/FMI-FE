"use client";

import { useSearchUpdateQueryString } from "@/hooks";
import { DetailHeader } from "@/components/layout";
import { ListSearch } from "@/components/domain";
import DefaultList from "../DefaultList/DefaultList";
import { SEARCH_HEADER_TITLE } from "../../_constants/SEARCH_HEADER_TITLE";
import { HeaderSearch } from "@/components/layout/DetailHeader/DetailHeaderParts";
import { ErrorBoundary } from "@/app/ErrorBoundary";

const ListView = () => {
  const { searchMode, searchUpdateQuery } = useSearchUpdateQueryString();

  return (
    <>
      <DetailHeader title={SEARCH_HEADER_TITLE[searchMode]}>
        <HeaderSearch ariaLabel="게시글 검색" onClick={() => searchUpdateQuery("search", "post")} />
      </DetailHeader>

      {searchMode === "default" ? (
        <ErrorBoundary showToast toastMessage="목록을 불러올 수 없어요. 다시 시도해 주세요.">
          <DefaultList searchUpdateQuery={searchUpdateQuery} />
        </ErrorBoundary>
      ) : (
        <ListSearch searchMode={searchMode} />
      )}
    </>
  );
};

export default ListView;
