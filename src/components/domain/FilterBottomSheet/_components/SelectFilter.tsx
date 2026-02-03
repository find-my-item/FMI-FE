// 수정 중
"use client";

import { PostListItem, Tab } from "@/components/domain";
import { useGetPosts } from "@/api/fetch/post";
import { useListDataWithFilters } from "@/app/(route)/list/_hooks/useListDataWithFilters/useListDataWithFilters";
import { useListParams } from "@/app/(route)/list/_hooks/useListParams/useListParams";
import { TABS } from "@/app/(route)/list/_constants/TABS";
import FilterSection from "@/app/(route)/list/_components/_internal/FilterSection/FilterSection";

type PostType = "LOST" | "FOUND";

interface SelectFilterProps {
  searchUpdateQuery: (key: string, value?: string) => void;
}

const SelectFilter = ({ searchUpdateQuery }: SelectFilterProps) => {
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
        <ul>
          {listData?.result?.posts?.map((item) => (
            <PostListItem key={item.postId} post={item} linkState="list" />
          ))}
        </ul>
      </section>
    </section>
  );
};

export default SelectFilter;
