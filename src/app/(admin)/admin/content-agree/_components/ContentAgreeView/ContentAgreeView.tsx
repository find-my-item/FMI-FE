"use client";

import { PostListItem } from "@/components/domain";
import { ContentAgreeFilter } from "../_internal";

// TODO(지권): 임시 데이터
const mock = {
  id: 1,
  title: "제목입니다",
  summary: "내용입니다",
  thumbnailImageUrl: "",
  address: "주소입니다",
  postStatus: "FOUND",
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

const ContentAgreeView = () => {
  return (
    <>
      <ContentAgreeFilter />

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

export default ContentAgreeView;
