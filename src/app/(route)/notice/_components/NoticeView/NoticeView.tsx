"use client";

import NoticeList from "../NoticeList/NoticeList";
import { InputSearch } from "@/components/common";
import NoticeFilter from "../NoticeFilter/NoticeFilter";

const NoticeView = () => {
  return (
    <div className="h-base">
      <div className="px-5 py-[10px]">
        <InputSearch
          name="noticeSearch"
          mode="onChange"
          onEnter={() => {}}
          placeholder="제목, 내용을 입력해 주세요."
        />
      </div>
      <NoticeFilter />
      <NoticeList />
    </div>
  );
};

export default NoticeView;
