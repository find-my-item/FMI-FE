"use client";

import { DetailHeader } from "@/components/layout";
import { MypagePostsContent } from "./_components";
import { FilterSection, MypageSearch } from "@/components/domain";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { LoadingState } from "@/components/state";
import { Suspense } from "react";

const page = () => {
  return (
    <>
      <DetailHeader title="내가 쓴 게시글" />
      <h1 className="sr-only">내가 쓴 게시글 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />

        <FilterSection pageType="MY_POSTS" />

        <ErrorBoundary toastMessage="목록을 불러올 수 없어요. 다시 시도해 주세요.">
          <Suspense fallback={<LoadingState />}>
            <MypagePostsContent />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default page;
