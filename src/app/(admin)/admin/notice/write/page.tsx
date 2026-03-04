"use client";

import { DetailHeader } from "@/components/layout";
import { FormProvider, useForm } from "react-hook-form";
import { NoticeWriteForm } from "./_components";

const NoticeWrite = () => {
  const methods = useForm();

  return (
    <>
      <DetailHeader title="공지사항 글쓰기" />
      <h1 className="sr-only">공지사항 글쓰기 페이지</h1>
      <FormProvider {...methods}>
        <NoticeWriteForm methods={methods} />
      </FormProvider>
    </>
  );
};

export default NoticeWrite;
