"use client";

import { DetailHeader } from "@/components/layout";
import { FormProvider, useForm } from "react-hook-form";
import { NoticeWriteForm } from "./_components";
import { NoticeWriteFormValues } from "./_types/NoticeWriteType";

const defaultValues: NoticeWriteFormValues = {
  title: "",
  content: "",
  category: "GENERAL",
  images: [],
};

const NoticeWrite = () => {
  const methods = useForm<NoticeWriteFormValues>({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  return (
    <>
      <DetailHeader title="공지사항 글쓰기" />
      <h1 className="sr-only">공지사항 글쓰기 페이지</h1>
      <FormProvider<NoticeWriteFormValues> {...methods}>
        <NoticeWriteForm methods={methods} />
      </FormProvider>
    </>
  );
};

export default NoticeWrite;
