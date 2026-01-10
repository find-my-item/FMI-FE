"use client";

import { DetailHeader, Filter, InputSearch } from "@/components";
import { MYPAGE_POSTS_CONFIG } from "./_constants/MYPAGE_POSTS_CONFIG";

const page = () => {
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
              onSelected={false}
              icon={{ name: "ArrowDown" }}
              onClick={() => alert("테스트")}
              iconPosition="trailing"
            >
              {item.name}
            </Filter>
          ))}
        </section>

        <section>
          <h2 className="sr-only">게시글 목록 영역</h2>
        </section>
      </div>
    </>
  );
};

export default page;
