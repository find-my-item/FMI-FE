"use client";

import { useSearchParams } from "next/navigation";
import { useGetPosts, usePostPostsFilter } from "@/api/fetch/post";
import { Tab } from "@/components/domain";
import { TABS } from "../../_constants/TABS";
import ListItem from "../ListItem/ListItem";
import FilterSection from "../_internal/FilterSection/FilterSection";

type PostType = "LOST" | "FOUND";

interface DefaultListProps {
  searchUpdateQuery: (key: string, value?: string) => void;
}

const DefaultList = ({ searchUpdateQuery }: DefaultListProps) => {
  const searchParams = useSearchParams();

  const rawType = searchParams.get("type");
  const type: PostType = rawType === "found" ? "FOUND" : "LOST";

  const rawRegion = searchParams.get("region");
  const rawCategory = searchParams.get("category");
  const rawSort = searchParams.get("sort");
  const rawStatus = searchParams.get("status");

  const { data } = useGetPosts({ page: 0, size: 10, type });
  const { mutate, data: filterData } = usePostPostsFilter();

  return (
    <>
      <Tab
        tabs={TABS}
        selected={rawType ?? "lost"}
        onValueChange={(key) => searchUpdateQuery("type", key)}
      />

      <FilterSection />

      <section aria-label="게시글 목록" className="w-full">
        {data?.result?.posts?.map((item) => (
          <ListItem key={item.postId} post={item} linkState="list" />
        ))}
      </section>
    </>
  );
};

export default DefaultList;
