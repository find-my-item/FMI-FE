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
  const normalizedType = type?.toLowerCase();
  const selectedType = (normalizedType ?? "lost") as "lost" | "found";
  const postType: PostType = selectedType === "found" ? "FOUND" : "LOST";

  const postStatus: ItemStatus | undefined =
    status && status.trim() !== "" ? (status as ItemStatus) : undefined;

  const {
    data: listData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPosts({
    address: region ?? "",
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

      <Suspense fallback={<LoadingState />}>
        <section aria-label="게시글 목록" className="w-full">
          {listData?.length === 0 ? (
            <EmptyState
              icon={{
                iconName: "EmptyPostList",
                iconSize: 200,
              }}
              description={"아직 게시글이 없어요.\n가장 먼저 작성해보세요!"}
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
    </section>
  );
};

export default DefaultList;
