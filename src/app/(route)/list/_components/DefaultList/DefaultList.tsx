"use client";

import { Suspense } from "react";
import { useGetPosts } from "@/api/fetch/post";
import { ErrorBoundary } from "@/app/ErrorBoundary";
import { PostListItem, Tab } from "@/components/domain";
import { EmptyState, LoadingState } from "@/components/state";
import { TABS } from "../../_constants/TABS";
import FilterSection from "../_internal/FilterSection/FilterSection";
import { useListParams } from "../../_hooks/useListParams/useListParams";
import { useListDataWithFilters } from "../../_hooks/useListDataWithFilters/useListDataWithFilters";

type PostType = "LOST" | "FOUND";

interface DefaultListProps {
  searchUpdateQuery: (key: string, value?: string) => void;
}

const DefaultList = ({ searchUpdateQuery }: DefaultListProps) => {
  const { type, region, category, sort, status } = useListParams();
  const selectedType = (type ?? "lost") as "lost" | "found";
  const postType: PostType = selectedType === "lost" ? "LOST" : "FOUND";

  const { data } = useGetPosts({ page: 0, size: 10, type: postType });
  const { listData } = useListDataWithFilters({ baseData: data, region, category, sort, status });

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
            {listData?.result?.posts?.length === 0 ? (
              <EmptyState
                icon={{
                  iconName: "EmptyPostList",
                  iconSize: 200,
                }}
              />
            ) : (
              <ul>
                {listData?.result?.posts?.map((item) => (
                  <PostListItem key={item.postId} post={item} linkState="list" />
                ))}
              </ul>
            )}
          </section>
        </Suspense>
      </ErrorBoundary>
    </section>
  );
};

export default DefaultList;
