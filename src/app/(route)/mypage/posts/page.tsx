"use client";

import { DetailHeader } from "@/components/layout";
import { MypagePostsFilter, MypagePostsList, MypagePostsSearch } from "./_components";

const page = () => {
  return (
    <>
      <DetailHeader title="내가 쓴 게시물" />
      <h1 className="sr-only">내가 쓴 게시물 페이지</h1>
      <div className="w-full h-base">
        <MypagePostsSearch />

        <MypagePostsFilter />

        <MypagePostsList />
      </div>
    </>
  );
};

export default page;
