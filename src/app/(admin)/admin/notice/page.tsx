"use client";

import { Filter, InputSearch } from "@/components/common";
import { PostListItem } from "@/components/domain";
import { DetailHeader } from "@/components/layout";
import { MOCK_NOTICE_LIST } from "@/mock/data";

const page = () => {
  return (
    <div>
      <DetailHeader title="공지사항" />
      <h1 className="sr-only">관리자 공지사항</h1>

      <div>
        <div className="px-5 py-[10px]">
          <InputSearch
            placeholder="제목, 내용을 입력해 주세요."
            name="search"
            mode="onChange"
            onEnter={() => {}}
          />
        </div>

        <div className="px-5 py-[10px]">
          <Filter
            ariaLabel="최신순"
            onSelected={false}
            icon={{ name: "ArrowDown", size: 12 }}
            iconPosition="trailing"
            onClick={() => {}}
          >
            최신순
          </Filter>
        </div>

        <section aria-label="공지사항 목록" className="">
          <ul>
            {Array.from({ length: 10 }).map((_, index) => (
              <PostListItem key={index} post={MOCK_NOTICE_LIST} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default page;
