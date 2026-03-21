"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { InputSearch } from "@/components/common";
import PublicDataSearchList from "../PublicDataSearchList/PublicDataSearchList";

const PublicDataSearchContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsConfig = useParams();
  const type = paramsConfig.type === "found" ? "found" : "lost";

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

      <PublicDataSearchList />
    </>
  );
};

export default PublicDataSearchContent;
