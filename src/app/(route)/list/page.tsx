"use client";

import { Dropdown, Tab } from "@/components";
import { useState } from "react";
import ListItem from "./_components/ListItem/ListItem";
import Icon from "@/components/Icon/Icon";
import { DetailHeader } from "@/components/index";
import { TABS } from "./_constants/TABS";
import ListSearch from "@/components/ListSearch/ListSearch";

type SearchMode = "default" | "region" | "post";

const page = () => {
  const [selected, setSelected] = useState("LOST");
  const [selectedRegion, setSelectedRegion] = useState("지역선택");
  const [selectedView, setSelectedView] = useState("조회순");
  const [selectedCategory, setSelectedCategory] = useState("찾는중");
  const [searchMode, setSearchMode] = useState<SearchMode>("default");

  const dropdowns = [
    { value: selectedRegion, setValue: setSelectedRegion, icon: "Position" },
    { value: selectedView, setValue: setSelectedView, icon: "ArrowDown" },
    { value: selectedCategory, setValue: setSelectedCategory, icon: "ArrowDown" },
  ] as const;

  const headerTitle = {
    default: "게시글",
    region: "지연 선택",
    post: "게시글 검색",
  };

  return (
    <>
      <DetailHeader title={headerTitle[searchMode]}>
        <DetailHeader.Search ariaLabel="게시글 검색" onClick={() => setSearchMode("post")} />
      </DetailHeader>

      {searchMode === "default" ? (
        <>
          <Tab tabs={TABS} selected={selected} onValueChange={setSelected} />

          <div className="flex h-[67px] w-full items-center gap-2 px-5">
            {dropdowns.map(({ value, setValue, icon }, idx) => (
              <Dropdown key={idx} options={[]} onSelect={setValue} className="gap-[4px]">
                {idx === 0 && <Icon name={icon} size={16} />}
                <span className="text-[16px] font-semibold text-[#525252]">{value}</span>
                {idx !== 0 && <Icon name="ArrowDown" size={12} />}
              </Dropdown>
            ))}
          </div>

          {/* 아이템 */}
          <div className="w-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <ListItem
                id={1}
                linkState="list"
                img="/test_list.JPG"
                title="게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목게시글 제목"
                description="서울시 노원구 00동 건물 화장실에서 핸드폰을 잃어버렸습니다"
                key={index}
              />
            ))}
          </div>
        </>
      ) : (
        <ListSearch />
      )}
    </>
  );
};

export default page;
