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
import { useEffect } from "react";
import { MOCK_MYPAGE_POSTS_LIST } from "@/mock/data";

const page = () => {
  const { type, status, category, sort, startDate, endDate } = useFilterParams();
  console.log(
    "type>> ",
    type,
    "status>> ",
    status,
    "startDate>> ",
    startDate,
    "endDate>>> ",
    endDate
  );

  const {
    data: PostsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetUsersMePosts({
    postType: type as StatusFilterValue,
    postStatus: status as FindStatusFilterValue,
    category,
    startDate,
    endDate,
    sortType: sort ?? "LATEST",
  });

  useEffect(() => {
    if (PostsData) {
      console.log("데이터 도착! >> ", PostsData);
    }
  }, [PostsData]);

  return (
    <>
      <DetailHeader title="내가 쓴 게시글" />
      <h1 className="sr-only">내가 쓴 게시글 페이지</h1>
      <div className="w-full h-base">
        <MypageSearch />

        <FilterSection pageType="MY_POSTS" />

        {/* <ErrorBoundary toastMessage="목록을 불러올 수 없어요. 다시 시도해 주세요.">
          <MypagePostsList postsData={MOCK_MYPAGE_POSTS_LIST} />
        </ErrorBoundary> */}

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
