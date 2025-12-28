"use client";

import { Filter, Tab } from "@/components";
import ListItem from "../ListItem/ListItem";
import { TABS } from "../../_constants/TABS";
import { useGetPost } from "@/api/list/useGetPost";
import { useSearchParams } from "next/navigation";

type PostType = "LOST" | "FOUND";

interface DefaultListProps {
  searchUpdateQuery: (key: string, value?: string) => void;
  // dropdowns?: { value: string; setValue: Dispatch<SetStateAction<string>>; icon: IconName }[];
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

      <section aria-label="필터 영역" className="flex h-[67px] w-full items-center gap-2 px-5">
        <Filter
          ariaLabel="지역 선택 필터 버튼"
          children={"지역 선택"}
          onSelected={false}
          icon={{ name: "Location", size: 16 }}
          onClick={() => searchUpdateQuery("search", "region")}
        />
        {/* TODO(형준): UI 깨짐 현상으로 인한 주석처리 */}
        {/* {dropdowns.map(({ value, setValue, icon }, idx) => (
          <Dropdown key={idx} options={[]} onSelect={setValue} className="gap-[4px]">
            {idx === 0 && <Icon name={icon} size={16} />}
            <span className="text-[16px] font-semibold text-[#525252]">{value}</span>
            {idx !== 0 && <Icon name="ArrowDown" size={12} />}
          </Dropdown>
        ))} */}
      </section>

      {/* 아이템 */}
      <section aria-label="게시글 목록" className="w-full">
        {data?.result?.map((item) => (
          <ListItem key={item.postId} post={item} linkState="list" />
        ))}
      </section>
    </>
  );
};

export default DefaultList;
