"use client";

import { DetailHeader } from "@/components/layout";
import { MYPAGE_POSTS_CONFIG } from "./_constants/MYPAGE_POSTS_CONFIG";
import { Chip, Filter, Icon, InputSearch } from "@/components/common";
import Link from "next/link";
import Image from "next/image";
import { formatDate, getItemCategoryLabel, getItemStatusLabel } from "@/utils";
import { ListItem } from "../../list/_components";

const page = () => {
  const VIEW_ITEM = [
    {
      icon: "Star",
      count: 3,
    },
    {
      icon: "Eye",
      count: 0,
    },
  ] as const;

  const linkState = "list";
  const thumbnailUrl = "/";
  const title = "제목";
  const address = "경기도 평택시";
  const postId = 2;
  const summary = "이것은 전자기기기ㅏㅣ아ㅓ림나ㅓㅇㄹ";
  return (
    <>
      <DetailHeader title="내가 쓴 게시물" />
      <h1 className="sr-only">내가 쓴 게시물 페이지</h1>
      <div className="w-full h-base">
        <section className="w-full px-5 py-[10px]">
          <h2 className="sr-only">검색 영역</h2>
          <InputSearch name="search" mode="onChange" onEnter={(v) => console.log(v)} />
        </section>

        <section className="flex w-full gap-2 overflow-x-auto px-5 py-[14px]">
          <h2 className="sr-only">필터링 영역</h2>
          {MYPAGE_POSTS_CONFIG.map((item) => (
            <Filter
              key={item.name}
              ariaLabel={item.name}
              icon={item.icon}
              onSelected={false}
              onClick={() => alert("테스트")}
              iconPosition={item.iconPosition}
            >
              {item.name}
            </Filter>
          ))}
        </section>

        <section>
          <h2 className="sr-only">게시글 목록 영역</h2>
          {[1, 2, 3].map((item) => (
            <ListItem
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
                createdAt: "30분 전",
              }}
            />
          ))}
        </section>
      </div>
    </>
  );
};

export default page;
