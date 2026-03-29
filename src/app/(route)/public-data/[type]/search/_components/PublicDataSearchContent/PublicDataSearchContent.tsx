"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { InputSearch } from "@/components/common";
import PublicDataSearchList from "../PublicDataSearchList/PublicDataSearchList";
import { Tab } from "@/components/domain";
import { usePublicDataTabQuery } from "@/app/(route)/public-data/_hooks/usePublicDataTabQuery/usePublicDataTabQuery";

const PublicDataSearchContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsConfig = useParams();
  const type = paramsConfig.type === "found" ? "found" : "lost";
  const { activeTab, handleTabChange, PUBLIC_LIST_TABS } = usePublicDataTabQuery();

  const handlePublicDataSearch = (newKeyword: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newKeyword === params.get("keyword")) return;

    if (!newKeyword) {
      params.delete("keyword");
    } else {
      params.set("keyword", newKeyword);
    }

    router.replace(`/public-data/${type}/search?${params.toString()}`);
  };

  return (
    <>
      <section aria-label="경찰청 데이터 검색" className="px-5 py-[10px]">
        <InputSearch
          name="search"
          mode="onChange"
          defaultValue={searchParams.get("keyword") || ""}
          placeholder="검색어를 입력해주세요."
          onEnter={handlePublicDataSearch}
        />
      </section>

      <Tab
        tabs={PUBLIC_LIST_TABS}
        selected={activeTab}
        onValueChange={(key) => handleTabChange(key)}
        className="sticky left-0 top-[56px]"
      />

      <PublicDataSearchList />
    </>
  );
};

export default PublicDataSearchContent;
