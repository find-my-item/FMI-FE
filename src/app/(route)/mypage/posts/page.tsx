"use client";

import { DetailHeader } from "@/components/layout";
import { MYPAGE_POSTS_FILTER } from "./_constants/MYPAGE_POSTS_FILTER";
import { Filter, InputSearch } from "@/components/common";
import { useState } from "react";
import { MypagePostsBottomSheet } from "./_components";
import { PostListItem } from "@/components/domain";

const page = () => {
  const [isBottomOpen, setIsBottomOpen] = useState(false);
  const [bottomStateType, setBottomStateType] = useState<"Date" | "Filter">("Date");

  const handleFilterClick = (name: string) => {
    setIsBottomOpen(true);
    if (name === "기간") {
      setBottomStateType("Date");
    } else {
      setBottomStateType("Filter");
    }
  };

  return (
    <>
      <DetailHeader title="내가 쓴 게시물" />
      <h1 className="sr-only">내가 쓴 게시물 페이지</h1>
      <div className="w-full h-base">
        <section className="w-full px-5 py-[10px]">
          <h2 className="sr-only">검색 영역</h2>
          <InputSearch name="search" mode="onChange" onEnter={(v) => console.log(v)} />
        </section>

        <section className="hidden-scrollbar flex w-full gap-2 overflow-x-auto px-5 py-[14px]">
          <h2 className="sr-only">필터링 영역</h2>
          {MYPAGE_POSTS_FILTER.map((item) => (
            <Filter
              key={item.name}
              ariaLabel={item.name}
              icon={item.icon}
              onSelected={false}
              onClick={() => handleFilterClick(item.name)}
              iconPosition={item.iconPosition}
            >
              {item.name}
            </Filter>
          ))}

          <MypagePostsBottomSheet
            isOpen={isBottomOpen}
            onClose={() => setIsBottomOpen(false)}
            mode={bottomStateType}
          />
        </section>

        <ul>
          <h2 className="sr-only">게시글 목록 영역</h2>
          {[1, 2, 3].map((item) => (
            <PostListItem
              key={item}
              post={{
                postId: 1,
                title: "전자기기를 잃어버렸어요",
                summary: "전자기기를 읽어버렸다구리이부ㅜ루아ㅓㅁㄴ이5ㄱ",
                thumbnailUrl: "https://picsum.photos/400/300?random=1",
                address: "서울특별시 강남구",
                itemStatus: "SEARCHING",
                postType: "FOUND",
                category: "CARD",
                favoriteCount: 3,
                viewCount: 5,
                createdAt: "30분 전",
                hot: false,
                new: false,
              }}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default page;
