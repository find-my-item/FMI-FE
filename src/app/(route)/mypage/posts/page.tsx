"use client";

import { DetailHeader } from "@/components/layout";
import { MypagePostsList } from "./_components";
import { FilterSection, MypageSearch } from "@/components/domain";
import { useGetUsersMePosts } from "@/api/fetch/user";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { useFilterParams } from "@/hooks/domain";
import {
  FindStatusFilterValue,
  StatusFilterValue,
} from "@/components/domain/FilterSectionBottomSheet/_types/types";

const page = () => {
  const { status, findStatus, category, sort, startDate, endDate } = useFilterParams();

  const {
    data: PostsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetUsersMePosts({
    postType: status as StatusFilterValue,
    postStatus: findStatus as FindStatusFilterValue,
    category,
    startDate,
    endDate,
    sortType: sort ?? "LATEST",
  });

  return (
    <>
      <DetailHeader title="내가 쓴 게시글" />
      <h1 className="sr-only">내가 쓴 게시글 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />

        <FilterSection pageType="MY_POSTS" />

        <ErrorBoundary toastMessage="목록을 불러올 수 없어요. 다시 시도해 주세요.">
          <MypagePostsList
            postsData={PostsData}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default page;
