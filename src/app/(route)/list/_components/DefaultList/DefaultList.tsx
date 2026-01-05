"use client";

import { useEffect } from "react";
import { Tab } from "@/components/domain";
import { useGetPosts, usePostPostsFilter } from "@/api/fetch/post";
import { TABS } from "../../_constants/TABS";
import ListItem from "../ListItem/ListItem";
import FilterSection from "../_internal/FilterSection/FilterSection";
import {
  CategoryFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "../_internal/FilterBottomSheet/types";
import { usePostListFiltersFromSearchParams } from "../../_hooks/usePostListFromParams/usePostListFromParams";

type PostType = "LOST" | "FOUND";

interface DefaultListProps {
  searchUpdateQuery: (key: string, value?: string) => void;
}

const DefaultList = ({ searchUpdateQuery }: DefaultListProps) => {
  const { type, status, category, sort, region } = usePostListFiltersFromSearchParams();

  const postType: PostType = type === "lost" ? "LOST" : "FOUND";

  const { data } = useGetPosts({ page: 0, size: 10, type: postType });
  const { mutate, data: filterData } = usePostPostsFilter();

  useEffect(() => {
    mutate({
      address: region ?? undefined,
      category: category as CategoryFilterValue,
      sortType: sort as SortFilterValue,
      itemStatus: status as StatusFilterValue,
    });
  }, [mutate, category, region, sort, status]);

  console.log(filterData);

  return (
    <section className="h-base">
      <Tab
        tabs={TABS}
        selected={postType}
        onValueChange={(key) => searchUpdateQuery("type", key)}
      />

      <FilterSection />

      <section aria-label="게시글 목록" className="w-full">
        {data?.result?.posts?.map((item) => (
          <ListItem key={item.postId} post={item} linkState="list" />
        ))}
      </section>
    </section>
  );
};

export default DefaultList;
