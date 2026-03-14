"use client";

import { FilterSection, MypageSearch } from "@/components/domain";
import { DetailHeader } from "@/components/layout";
import { MypageFavoritesContent } from "./_components";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { Suspense } from "react";
import { LoadingState } from "@/components/state";

const page = () => {
  return (
    <>
      <DetailHeader title="즐겨찾기 목록" />
      <h1 className="sr-only">즐겨찾기 목록 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />

        <FilterSection pageType="MY_FAVORITES" />

        <ErrorBoundary toastMessage="목록을 불러올 수 없어요. 다시 시도해 주세요.">
          <Suspense fallback={<LoadingState />}>
            <MypageFavoritesContent />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default page;
