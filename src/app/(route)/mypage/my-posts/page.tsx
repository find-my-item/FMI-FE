"use client";

import { DetailHeader, Filter, InputSearch } from "@/components";

const page = () => {
  return (
    <>
      <DetailHeader title="내가 쓴 게시물" />
      <h1 className="sr-only">내가 쓴 게시물 페이지</h1>
      <div className="w-full h-base">
        <InputSearch name="search" mode="onChange" onEnter={(v) => console.log(v)} />
        {/* <Filter
          ariaLabel="최신순"
          onSelected={true}
          icon={{ name: "Menu" }}
          iconPosition="trailing"
          onClick={(v) => console.log(v)}
        >
          최신순
        </Filter> */}
      </div>
    </>
  );
};

export default page;
