"use client";

import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { InputSearch } from "@/components/common";
import { useSearchUpdateQueryString } from "@/hooks";
import { useEffect, useState } from "react";

const SEARCH_DEBOUNCE_DELAY_MS = 300;

const NoticeSearchForm = () => {
  const { searchUpdateQuery } = useSearchUpdateQueryString();
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const noticeSearch = methods.watch("noticeSearch") ?? "";
  const [debouncedKeyword, setDebouncedKeyword] = useState(noticeSearch);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(noticeSearch);
    }, SEARCH_DEBOUNCE_DELAY_MS);

    return () => clearTimeout(handler);
  }, [noticeSearch]);

  useEffect(() => {
    searchUpdateQuery("keyword", debouncedKeyword);
  }, [debouncedKeyword, searchUpdateQuery]);

  const handleSearchSubmit = ({ noticeSearch }: FieldValues) => {
    if (!noticeSearch.trim()) return;
    searchUpdateQuery("keyword", noticeSearch);
  };

  return (
    <div className="px-5 py-[10px]">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSearchSubmit)}>
          <InputSearch name="noticeSearch" mode="RHF" placeholder="제목, 내용을 입력해 주세요." />
        </form>
      </FormProvider>
    </div>
  );
};

export default NoticeSearchForm;
