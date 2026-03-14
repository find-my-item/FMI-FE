"use client";

import { DetailHeader } from "@/components/layout";
import { HeaderPost } from "@/components/layout/DetailHeader/DetailHeaderParts";
import { FormProvider, useForm } from "react-hook-form";
import { InquiryTargetType } from "@/types";
import { InquiryCategoryButton, InquiryInput, InquiryTextarea } from "./_components";
import { WriteImageSection } from "@/components/domain";

interface InquiryWriteFormValues {
  title: string;
  email: string;
  inquiryType?: InquiryTargetType;
  content: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const canSubmit = (values: InquiryWriteFormValues): boolean => {
  const isValidEmail = EMAIL_REGEX.test(values.email?.trim() ?? "");

  return Boolean(
    values.title?.trim() && isValidEmail && values.inquiryType && values.content?.trim()
  );
};

const page = () => {
  const methods = useForm<InquiryWriteFormValues>({
    mode: "onChange",
    defaultValues: {
      email: "znznun@gmail.com",
    },
  });
  const values = methods.watch();
  const isPostDisabled = !canSubmit(values);

  const onSubmit = (data: InquiryWriteFormValues) => {};

  return (
    <div className="flex h-dvh flex-col">
      <DetailHeader title="무엇을 도와드릴까요?">
        <HeaderPost disabled={isPostDisabled} onClick={methods.handleSubmit(onSubmit)} />
      </DetailHeader>
      <hr className="border border-labelsVibrant-quaternary" />
      <h1 className="sr-only">1:1 문의하기 작성</h1>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-3 pt-5">
          <InquiryInput name="title" placeholder="문의 제목을 입력해 주세요." />
          <InquiryInput name="email" type="email" placeholder="이메일을 입력해주세요." />
          <InquiryCategoryButton />
          <InquiryTextarea name="content" />
          <div className="flex-1" />
          <hr className="border border-labelsVibrant-quaternary" />
          <WriteImageSection />
        </form>
      </FormProvider>
    </div>
  );
};

export default page;
