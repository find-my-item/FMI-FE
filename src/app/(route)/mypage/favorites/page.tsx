"use client";

import { FilterSection, MypageSearch } from "@/components/domain";
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

        <FilterSection pageType="MY_FAVORITES" />
      </div>
    </>
  );
};

export default page;
