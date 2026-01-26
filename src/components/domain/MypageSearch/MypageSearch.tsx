"use client";

import { InputSearch } from "@/components/common";

interface MypageSearchProps {
  // TODO(수현): api 연결 작업 시 사용할 예정
  searchMode?: "Posts" | "Comments" | "Favorite" | "Activity" | "Reports" | "Inquiries";
}

export const MypageSearch = ({ searchMode }: MypageSearchProps) => {
  return (
    <section className="w-full px-5 py-[10px]">
      <h2 className="sr-only">검색 영역</h2>
      {/* TODO(수현): onEnter 함수 api 연결 시 코드 추가 예정 */}
      <InputSearch name="search" mode="onChange" onEnter={() => {}} />
    </section>
  );
};

export default MypageSearch;
