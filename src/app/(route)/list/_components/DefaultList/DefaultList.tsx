"use client";

import { useSearchParams } from "next/navigation";
import { useGetPost } from "@/api/fetch/post";
import { Tab } from "@/components";
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

  const { data } = useGetPost({ page: 0, size: 10, type });

  return (
    <>
      <Tab
        tabs={TABS}
        selected={rawType ?? "lost"}
        onValueChange={(key) => searchUpdateQuery("type", key)}
      />

      <FilterSection />

      <section aria-label="게시글 목록" className="w-full">
        {data?.result?.map((item) => (
          <ListItem key={item.postId} post={item} linkState="list" />
        ))}
      </section>
    </>
  );
};

export default DefaultList;
