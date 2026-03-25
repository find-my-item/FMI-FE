"use client";

import { InputSearch } from "@/components/common";
import { useRouter, useSearchParams } from "next/navigation";

interface MypageSearchProps {
  searchMode: "posts" | "favorites" | "comments" | "activities" | "reports" | "inquiries";
}

const MypageSearch = ({ searchMode }: MypageSearchProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const searchValue = value.trim();

    if (searchValue) {
      params.set("keyword", searchValue);
    } else {
      params.delete("keyword");
    }

    router.push(`/mypage/${searchMode}?${params.toString()}`);
  };

  return (
    <section className="w-full px-5 py-[10px]">
      <h2 className="sr-only">검색 영역</h2>
      <InputSearch
        name="search"
        placeholder="제목, 내용을 입력해 주세요."
        mode="onChange"
        onEnter={(value) => handleSearch(value)}
      />
    </section>
  );
};

export default MypageSearch;
