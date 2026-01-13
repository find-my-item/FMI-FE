"use client";

import { PostListItem, Tab } from "@/components/domain";
import { useGetPosts } from "@/api/fetch/post";
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

      <section aria-label="게시글 목록" className="w-full">
        {listData?.result?.posts?.map((item) => (
          <PostListItem key={item.postId} post={item} linkState="list" />
        ))}
      </section>
    </section>
  );
};

export default DefaultList;
