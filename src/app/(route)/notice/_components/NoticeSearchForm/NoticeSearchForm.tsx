"use client";

import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { InputSearch } from "@/components/common";
import { useSearchUpdateQueryString } from "@/hooks";
import { debounce } from "lodash";
import { useEffect } from "react";

const SEARCH_DEBOUNCE_DELAY_MS = 500;

const NoticeSearchForm = () => {
  const { searchUpdateQuery } = useSearchUpdateQueryString();
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const noticeSearch = methods.watch("noticeSearch") ?? "";

  const debouncedSearchUpdate = debounce(
    (keyword: string) => searchUpdateQuery("keyword", keyword),
    SEARCH_DEBOUNCE_DELAY_MS
  );

  useEffect(() => {
    debouncedSearchUpdate(noticeSearch);
    return () => debouncedSearchUpdate.cancel();
  }, [noticeSearch, debouncedSearchUpdate]);

  const handleSearchSubmit = ({ noticeSearch }: FieldValues) => {
    if (!noticeSearch.trim()) return;
    searchUpdateQuery("keyword", noticeSearch);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSearchSubmit)} className="px-5 py-[10px]">
        <InputSearch name="noticeSearch" mode="RHF" placeholder="제목, 내용을 입력해 주세요." />
      </form>
    </FormProvider>
  );
};

export default NoticeSearchForm;
