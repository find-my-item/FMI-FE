"use client";

import { PostListItem } from "@/components/domain";
import { useGetMarketingPosts } from "@/api/fetch/admin";
import { useInfiniteScroll } from "@/hooks";
import { useFilterParams } from "@/hooks/domain";
import { ContentAgreeFilter } from "../_internal";
import { EmptyState, LoadingState } from "@/components/state";

const ContentAgreeView = () => {
  const { sort, category, status } = useFilterParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetMarketingPosts({
    sort: sort || "LATEST",
    category,
    postStatus: status as any,
    size: 20,
  });

  const { ref } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <>
      <ContentAgreeFilter />

      <section className="flex-1 overflow-y-auto">
        {isLoading ? (
          <LoadingState />
        ) : (
          <ul>
            {(data || []).map((post) => (
              <PostListItem post={post} linkState="list" key={post.id} />
            ))}
            {hasNextPage && <div ref={ref} className="h-10" />}
          </ul>
        )}
        {!isLoading && (!data || data.length === 0) && (
          <EmptyState
            icon={{ iconName: "ArrowDown", iconSize: 70 }}
            title="검색 결과가 없어요"
            description="입력한 내용을 다시 한 번 확인해 주세요."
          />
        )}
      </section>
    </>
  );
};

export default ContentAgreeView;
