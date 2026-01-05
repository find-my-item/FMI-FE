"use client";

import { Tab } from "@/components/domain";
import { useGetPosts } from "@/api/fetch/post";
import { TABS } from "../../_constants/TABS";
import ListItem from "../ListItem/ListItem";
import FilterSection from "../_internal/FilterSection/FilterSection";
import { usePostListFiltersFromSearchParams } from "../../_hooks/usePostListFromParams/usePostListFromParams";
import { useListDataWithFilters } from "../../_hooks/useListDataWithFilters/useListDataWithFilters";

type PostType = "LOST" | "FOUND";

interface DefaultListProps {
  searchUpdateQuery: (key: string, value?: string) => void;
}

const DefaultList = ({ searchUpdateQuery }: DefaultListProps) => {
  const { type, region, category, sort, status } = usePostListFiltersFromSearchParams();

  const postType: PostType = type === "lost" ? "LOST" : "FOUND";

  const { data } = useGetPosts({ page: 0, size: 10, type: postType });
  const { listData } = useListDataWithFilters({ baseData: data, region, category, sort, status });

  return (
    <section className="h-base">
      <Tab
        tabs={TABS}
        selected={postType}
        onValueChange={(key) => searchUpdateQuery("type", key)}
      />

      <FilterSection />

      <section aria-label="게시글 목록" className="w-full">
        {listData?.result?.posts?.map((item) => (
          <ListItem key={item.postId} post={item} linkState="list" />
        ))}
      </section>
    </section>
  );
};

export default DefaultList;
