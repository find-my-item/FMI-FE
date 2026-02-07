"use client";

import { Suspense } from "react";
import { useGetPosts } from "@/api/fetch/post";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { FilterSection, PostListItem, Tab } from "@/components/domain";
import { EmptyState, LoadingState } from "@/components/state";
import { TABS } from "../../_constants/TABS";
import { ItemStatus } from "@/types";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll/useInfiniteScroll";
import { useFilterParams } from "@/hooks/domain";

type PostType = "LOST" | "FOUND";

interface DefaultListProps {
  searchUpdateQuery: (key: string, value?: string) => void;
}

const DefaultList = ({ searchUpdateQuery }: DefaultListProps) => {
  const { type, region, category, sort, status } = useFilterParams();
  const selectedType = (type ?? "lost") as "lost" | "found";
  const postType: PostType = selectedType === "found" ? "FOUND" : "LOST";

  const postStatus: ItemStatus | undefined =
    status && status.trim() !== "" ? (status as ItemStatus) : undefined;

  const {
    data: listData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPosts({
    address: region ?? "서울특별시",
    postType,
    postStatus,
    category,
    sortType: sort ?? "LATEST",
  });
  const { ref: listRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <section className="h-base">
      <Tab
        tabs={TABS}
        selected={selectedType}
        onValueChange={(key) => searchUpdateQuery("type", key)}
      />

      <FilterSection />

      {/* TODO(지권): 에러 UI 추가 필요 */}
      <ErrorBoundary fallback={<div>에러 발생</div>}>
        <Suspense fallback={<LoadingState />}>
          <section aria-label="게시글 목록" className="w-full">
            {listData?.length === 0 ? (
              <EmptyState
                icon={{
                  iconName: "EmptyPostList",
                  iconSize: 200,
                }}
              />
            ) : (
              <>
                <ul>
                  {listData?.map((item) => (
                    <PostListItem key={item.id} post={item} linkState="list" />
                  ))}
                </ul>

                {hasNextPage && <div ref={listRef} className="h-10 w-full" />}
              </>
            )}
          </section>
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};

export default DefaultList;
