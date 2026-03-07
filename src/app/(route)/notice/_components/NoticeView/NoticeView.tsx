"use client";

import NoticeList from "../NoticeList/NoticeList";
import { InputSearch } from "@/components/common";
import NoticeFilter from "../NoticeFilter/NoticeFilter";
import { useGetNotices } from "@/api/fetch/notice";

const NoticeView = () => {
  const { data } = useGetNotices();

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
      <NoticeList notices={data ?? []} />
    </div>
  );
};

export default NoticeView;
