"use client";

import { useState } from "react";
import { DetailHeader } from "@/components/index";
import ListSearch from "@/components/ListSearch/ListSearch";
import useSearchUpdateQueryString from "@/hooks/useSearchUpdateQueryString";
import { SEARCH_HEADER_TITLE } from "../../_constants/SEARCH_HEADER_TITLE";
import DefaultList from "../DefaultList/DefaultList";

const ListView = () => {
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

      {searchMode === "default" ? (
        <DefaultList
          searchUpdateQuery={searchUpdateQuery}
          selected={selected}
          setSelected={setSelected}
        />
      ) : (
        <ListSearch searchMode={searchMode} />
      )}
    </>
  );
};

export default ListView;
