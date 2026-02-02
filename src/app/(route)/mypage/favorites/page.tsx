"use client";

import { MypageSearch } from "@/components/domain";
import SelectFilter from "@/components/domain/SelectFilter/SelectFilter";
import { DetailHeader } from "@/components/layout";
import { useSearchUpdateQueryString } from "@/hooks";

const page = () => {
  const { searchMode, searchUpdateQuery } = useSearchUpdateQueryString();

  return (
    <>
      <DetailHeader title="즐겨찾기 목록" />
      <h1 className="sr-only">즐겨찾기 목록 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />

        {searchMode === "default" && <SelectFilter searchUpdateQuery={searchUpdateQuery} />}
      </div>
    </>
  );
};

export default page;
