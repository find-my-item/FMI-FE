"use client";

import { DetailHeader } from "@/components/layout";
import { HeaderPost } from "@/components/layout/DetailHeader/DetailHeaderParts";
import { FormProvider, useForm } from "react-hook-form";
import { InquiryCategoryButton, InquiryInput, InquiryTextarea } from "./_components";

const page = () => {
  const methods = useForm({
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="h-base">
      <DetailHeader title="무엇을 도와드릴까요?">
        <HeaderPost />
      </DetailHeader>
      <hr className="border border-labelsVibrant-quaternary" />
      <h1 className="sr-only">1:1 문의하기 작성</h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-3 py-5">
          <InquiryInput name="title" placeholder="문의 제목을 입력해 주세요." />
          <InquiryInput name="email" type="email" placeholder="이메일을 입력해주세요." />
          <InquiryCategoryButton />
          <InquiryTextarea name="content" />
        </form>
      </FormProvider>
    </div>
  );
};

export default page;
