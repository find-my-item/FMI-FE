"use client";

import { DetailHeader } from "@/components/layout";
import { MypagePostsFilter, MypagePostsList } from "./_components";
import { MypageSearch } from "@/components/domain";

const page = () => {
  return (
    <>
      <DetailHeader title="내가 쓴 게시물" />
      <h1 className="sr-only">내가 쓴 게시물 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />

        <MypagePostsFilter />

        <MypagePostsList />
      </div>
    </>
  );
};

export default page;
