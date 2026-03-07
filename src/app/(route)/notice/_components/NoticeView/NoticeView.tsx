"use client";

import NoticeList from "../NoticeList/NoticeList";
import { InputSearch } from "@/components/common";
import NoticeFilter from "../NoticeFilter/NoticeFilter";
import { useGetNotices } from "@/api/fetch/notice";
import { useInfiniteScroll, useSearchUpdateQueryString } from "@/hooks";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";

const NoticeView = () => {
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const noticeSearch = methods.watch("noticeSearch") ?? "";
  const { data: notices, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetNotices();
  const { ref: noticeListRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });
  const { searchUpdateQuery } = useSearchUpdateQueryString();

  const handleSearchSubmit = ({ noticeSearch }: FieldValues) => {
    if (!noticeSearch.trim()) return;
    searchUpdateQuery("keyword", noticeSearch);
  };

  useEffect(() => {
    searchUpdateQuery("keyword", noticeSearch);
  }, [noticeSearch]);

  return (
    <div className="h-base">
      <div className="px-5 py-[10px]">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSearchSubmit)}>
            <InputSearch name="noticeSearch" mode="RHF" placeholder="제목, 내용을 입력해 주세요." />
          </form>
        </FormProvider>
      </div>
      <NoticeFilter />
      {notices && notices.length > 0 && <NoticeList notices={notices} />}
      <div ref={noticeListRef} className="h-[100px]" />
    </div>
  );
};

export default NoticeView;
