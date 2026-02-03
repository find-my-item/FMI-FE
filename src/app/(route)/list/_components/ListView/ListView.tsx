"use client";

/**
 * [SUSPENSE 테스트용] 정상 작동 확인 후 롤백 예정
 */
import { Suspense } from "react";
import { useSearchUpdateQueryString } from "@/hooks";
import { DetailHeader } from "@/components/layout";
import { ListSearch } from "@/components/domain";
import DefaultList from "../DefaultList/DefaultList";
import { SEARCH_HEADER_TITLE } from "../../_constants/SEARCH_HEADER_TITLE";

// [SUSPENSE 테스트용] 임시 fallback UI - 롤백 시 제거
const ListSuspenseFallback = () => (
  <div className="flex h-40 items-center justify-center text-gray-500">게시글 목록 로딩 중...</div>
);

const ListView = () => {
  const { searchMode, searchUpdateQuery } = useSearchUpdateQueryString();

  return (
    <>
      <DetailHeader title={SEARCH_HEADER_TITLE[searchMode]}>
        <DetailHeader.Search
          ariaLabel="게시글 검색"
          onClick={() => searchUpdateQuery("search", "post")}
        />
      </DetailHeader>

      {searchMode === "default" ? (
        <Suspense fallback={<ListSuspenseFallback />}>
          <DefaultList searchUpdateQuery={searchUpdateQuery} />
        </Suspense>
      ) : (
        <ListSearch searchMode={searchMode} />
      )}
    </>
  );
};

export default ListView;
