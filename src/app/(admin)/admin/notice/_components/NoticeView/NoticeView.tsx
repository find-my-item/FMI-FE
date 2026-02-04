"use client";

import { Filter, InputSearch } from "@/components/common";
import NoticeList from "../NoticeList/NoticeList";

const NoticeView = () => {
  return (
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

      <NoticeList />
    </div>
  );
};

export default NoticeView;
