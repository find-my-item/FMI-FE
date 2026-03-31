"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { InputSearch } from "@/components/common";
import { PostListItem } from "@/components/domain";

const mock = {
  id: 1,
  title: "제목입니다",
  summary: "내용입니다",
  thumbnailImageUrl: "",
  address: "주소입니다",
  postStatus: "SEARCHING",
  postType: "LOST",
  category: "ELECTRONICS",
  favoriteCount: 1,
  favoriteStatus: true,
  viewCount: 1,
  isNew: false,
  isHot: false,
  createdAt: "2026-03-30T18:36:13+09:00",
  imageCount: 1,
};

const ContentAgreeSearchView = () => {
  const router = useRouter();
  const params = useSearchParams();
  const search = params.get("search");

  const handleSearch = (value: string) => {
    if (value === "") {
      router.push(`/admin/content-agree/search`);
    } else {
      router.push(`/admin/content-agree/search?search=${value}`);
    }
  };

  return (
    <>
      <section className="px-5 py-[10px]">
        <InputSearch
          placeholder="제목, 내용을 입력해 주세요."
          mode="onChange"
          name="search"
          onEnter={handleSearch}
        />
      </section>

      <section>
        <ul>
          {Array.from({ length: 10 }).map((_, index) => (
            <PostListItem post={mock} linkState="list" key={index} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default ContentAgreeSearchView;
