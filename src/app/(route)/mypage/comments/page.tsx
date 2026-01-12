"use client";

import { DetailHeader } from "@/components/layout";
import { Filter, InputSearch } from "@/components/common";
import { ListItem } from "../../list/_components";
import { useState } from "react";
import { MYPAGE_COMMENTS_FILTER } from "./_constants/MYPAGE_COMMENTS_FILTER";
import MypageCommentsBottomSheet from "./_components/MypageCommentsBottomSheet";

const page = () => {
  const [isBottomOpen, setIsBottomOpen] = useState(false);
  const [bottomState, setBottomState] = useState<"Date" | "Filter">("Date");

  const handleFilterClick = (name: string) => {
    setIsBottomOpen(true);
    if (name === "기간") {
      setBottomState("Date");
    } else {
      setBottomState("Filter");
    }
  };

  return (
    <>
      <DetailHeader title="내가 쓴 댓글" />
      <h1 className="sr-only">내가 쓴 댓글 페이지</h1>
      <div className="w-full h-base">
        <section className="w-full px-5 py-[10px]">
          <h2 className="sr-only">검색 영역</h2>
          <InputSearch name="search" mode="onChange" onEnter={(v) => console.log(v)} />
        </section>

        <section className="flex w-full gap-2 overflow-x-auto px-5 py-[14px]">
          <h2 className="sr-only">필터링 영역</h2>
          {MYPAGE_COMMENTS_FILTER.map((item) => (
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

          <MypageCommentsBottomSheet
            isOpen={isBottomOpen}
            onClose={() => setIsBottomOpen(false)}
            state={bottomState}
          />
        </section>

        <section>
          <h2 className="sr-only">댓글 목록 영역</h2>
          {[1, 2, 3].map((item) => (
            <div></div>
          ))}
        </section>
      </div>
    </>
  );
};

export default page;
