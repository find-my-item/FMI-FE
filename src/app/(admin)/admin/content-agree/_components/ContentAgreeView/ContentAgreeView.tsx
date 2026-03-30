"use client";

import { PostListItem } from "@/components/domain";
import { AdminFilter } from "../../../_components";

const filters = [
  {
    label: "기간",
    onSelected: false,
    icon: {
      name: "Calendar",
      size: 16,
    },
    iconPosition: "leading",
    onClick: () => {},
  },
  { label: "전체", onSelected: true, onClick: () => {} },
];

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
    <div>
      <AdminFilter filters={filters} />

      <section>
        <ul>
          {Array.from({ length: 10 }).map((_, index) => (
            <PostListItem post={mock} linkState="list" key={index} />
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ContentAgreeView;
