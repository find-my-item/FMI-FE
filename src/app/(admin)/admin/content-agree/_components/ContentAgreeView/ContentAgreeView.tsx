"use client";

import { PostListItem } from "@/components/domain";
import { useGetMarketingPosts } from "@/api/fetch/admin";
import { useInfiniteScroll } from "@/hooks";
import { useFilterParams } from "@/hooks/domain";
import { ContentAgreeFilter } from "../_internal";
import { EmptyState, LoadingState } from "@/components/state";

const ContentAgreeView = () => {
  const { sort, category, findStatus } = useFilterParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useGetMarketingPosts({
    sort: sort || "LATEST",
    category,
    postStatus: findStatus,
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
            icon={{ iconName: "NoPublicDataSearch", iconSize: 70 }}
            title="게시글이 없어요"
            description="아직 콘텐츠 활용 동의한 게시글이 없습니다."
          />
        )}
      </section>
    </>
  );
};

export default ContentAgreeView;
