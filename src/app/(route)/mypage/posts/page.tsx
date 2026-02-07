"use client";

import { DetailHeader } from "@/components/layout";
import { MypagePostsList } from "./_components";
import { FilterSection, MypageSearch } from "@/components/domain";

const page = () => {
  return (
    <>
      <DetailHeader title="내가 쓴 게시물" />
      <h1 className="sr-only">내가 쓴 게시물 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />

        <FilterSection pageType="MY_POSTS" />

        <MypagePostsList data={[]} />
      </div>
    </>
  );
};

export default page;
