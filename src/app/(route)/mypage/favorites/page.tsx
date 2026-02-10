"use client";

import { FilterSection, MypageSearch } from "@/components/domain";
import { DetailHeader } from "@/components/layout";
import { MOCK_MYPAGE_POSTS_LIST } from "@/mock/data";
import { MypageFavoritesList } from "./_components";

const page = () => {
  return (
    <>
      <DetailHeader title="즐겨찾기 목록" />
      <h1 className="sr-only">즐겨찾기 목록 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />

        <FilterSection pageType="MY_FAVORITES" />

        <MypageFavoritesList data={MOCK_MYPAGE_POSTS_LIST} />
      </div>
    </>
  );
};

export default page;
