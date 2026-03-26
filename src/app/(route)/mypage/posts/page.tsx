"use client";

import { DetailHeader } from "@/components/layout";
import { MypagePostsContent } from "./_components";
import { FilterSection, MypageSearch } from "@/components/domain";

const page = () => {
  return (
    <>
      <DetailHeader title="내가 쓴 게시글" />
      <h1 className="sr-only">내가 쓴 게시글 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch searchMode="posts" />

        <FilterSection pageType="MY_POSTS" />

        <MypagePostsContent />
      </div>
    </>
  );
};

export default page;
