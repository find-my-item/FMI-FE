"use client";

import { Dropdown, Filter, Tab } from "@/components";
import { useState } from "react";
import ListItem from "./_components/ListItem/ListItem";
import Icon from "@/components/Icon/Icon";
import { DetailHeader } from "@/components/index";
import { TABS } from "./_constants/TABS";
import ListSearch from "@/components/ListSearch/ListSearch";
import useSearchUpdateQueryString from "@/hooks/useSearchUpdateQueryString";
import { SEARCH_HEADER_TITLE } from "./_constants/SEARCH_HEADER_TITLE";

const page = () => {
  const [selected, setSelected] = useState("LOST");
  const [selectedRegion, setSelectedRegion] = useState("지역선택");
  const [selectedView, setSelectedView] = useState("조회순");
  const [selectedCategory, setSelectedCategory] = useState("찾는중");
  const { searchMode, searchUpdateQuery } = useSearchUpdateQueryString();

  const dropdowns = [
    { value: selectedRegion, setValue: setSelectedRegion, icon: "Position" },
    { value: selectedView, setValue: setSelectedView, icon: "ArrowDown" },
    { value: selectedCategory, setValue: setSelectedCategory, icon: "ArrowDown" },
  ] as const;

  return (
    <>
      <DetailHeader title={SEARCH_HEADER_TITLE[searchMode]}>
        <DetailHeader.Search
          ariaLabel="게시글 검색"
          onClick={() => searchUpdateQuery("search", "post")}
        />
      </DetailHeader>

      {searchMode === "default" && (
        <>
          <Tab tabs={TABS} selected={selected} onValueChange={setSelected} />

          <div className="flex h-[67px] w-full items-center gap-2 px-5">
            <Filter
              ariaLabel="지역 선택 필터 버튼"
              children={"지역 선택"}
              onSelected={false}
              icon={{ name: "Location", size: 16 }}
              onClick={() => searchUpdateQuery("search", "region")}
            />
            {/* {dropdowns.map(({ value, setValue, icon }, idx) => (
              <Dropdown key={idx} options={[]} onSelect={setValue} className="gap-[4px]">
                {idx === 0 && <Icon name={icon} size={16} />}
                <span className="text-[16px] font-semibold text-[#525252]">{value}</span>
                {idx !== 0 && <Icon name="ArrowDown" size={12} />}
              </Dropdown>
            ))} */}
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
      )}
      {searchMode !== "default" && (
        <ListSearch
          placeholder={
            searchMode === "post" ? "제목, 내용을 입력해 주세요." : "시/군/구를 입력해 주세요."
          }
        />
      )}
    </>
  );
};

export default page;
