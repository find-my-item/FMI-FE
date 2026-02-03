"use client";

import { PostListItem, Tab } from "@/components/domain";
import { useGetPosts } from "@/api/fetch/post";
import { TABS } from "../../_constants/TABS";
import FilterSection from "../_internal/FilterSection/FilterSection";
import { useListParams } from "../../_hooks/useListParams/useListParams";
import { ItemStatus } from "@/types";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll/useInfiniteScroll";

type PostType = "LOST" | "FOUND";

interface DefaultListProps {
  searchUpdateQuery: (key: string, value?: string) => void;
}

const DefaultList = ({ searchUpdateQuery }: DefaultListProps) => {
  const { type, region, category, sort, status } = useListParams();
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

      <section aria-label="게시글 목록" className="w-full">
        <ul>
          {listData?.map((item) => (
            <PostListItem key={item.id} post={item} linkState="list" />
          ))}
        </ul>
        {hasNextPage && <div ref={listRef} className="h-10 w-full" />}
      </section>
    </section>
  );
};

export default DefaultList;
