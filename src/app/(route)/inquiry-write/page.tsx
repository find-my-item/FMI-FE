"use client";

import { DetailHeader } from "@/components/layout";
import { HeaderPost } from "@/components/layout/DetailHeader/DetailHeaderParts";
import { FormProvider, useForm } from "react-hook-form";
import { InquiryTargetType } from "@/types";
import { InquiryCategoryButton, InquiryInput, InquiryTextarea } from "./_components";
import { WriteImageSection } from "@/components/domain";
import { usePostInquiry } from "@/api/fetch/inquiry";
import type { PostWriteFormValues } from "@/app/(route)/write/post/_types/PostWriteType";
import { useGetUsersMe } from "@/api/fetch/user";
import { useEffect } from "react";
import { resizeImage } from "@/utils/resizeImage/resizeImage";

interface InquiryWriteFormValues {
  title: string;
  email: string;
  inquiryType?: InquiryTargetType;
  content: string;
  images: PostWriteFormValues["images"];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const canSubmit = (values: InquiryWriteFormValues): boolean => {
  const isValidEmail = EMAIL_REGEX.test(values.email?.trim() ?? "");

  return Boolean(
    values.title?.trim() && isValidEmail && values.inquiryType && values.content?.trim()
  );
};

const page = () => {
  const { data: user, isSuccess: isUserSuccess } = useGetUsersMe();
  const { mutate: postInquiry, isPending } = usePostInquiry(isUserSuccess);
  const email = user?.result?.email ?? "";
  const methods = useForm<InquiryWriteFormValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });
  const values = methods.watch();
  const isPostDisabled = !canSubmit(values);

  useEffect(() => {
    if (!isUserSuccess || !email) return;

    const currentEmail = methods.getValues("email");
    if (currentEmail) return;

    methods.setValue("email", email, { shouldValidate: true, shouldDirty: true });
  }, [email, isUserSuccess, methods]);

  const onSubmit = async ({
    title,
    content,
    inquiryType,
    email,
    images,
  }: InquiryWriteFormValues) => {
    if (!inquiryType) return;

    const inquiry = { title, content, inquiryType, email };
    const formData = new FormData();
    formData.append("inquiry", new Blob([JSON.stringify(inquiry)], { type: "application/json" }));

    const originalFiles = images
      .map((image) => image.file)
      .filter((file): file is File => Boolean(file));
    const resizedFiles = await Promise.all(
      originalFiles.map(async (file) => {
        try {
          return await resizeImage(file);
        } catch {
          return file;
        }
      })
    );

    resizedFiles.forEach((file) => {
      formData.append("images", file);
    });

    postInquiry(formData);
  };

  return (
    <div className="flex h-dvh flex-col">
      <DetailHeader title="무엇을 도와드릴까요?">
        <HeaderPost
          disabled={isPostDisabled || isPending}
          onClick={methods.handleSubmit(onSubmit)}
        />
      </DetailHeader>
      <h1 className="sr-only">1:1 문의하기 작성</h1>
      <hr className="border border-labelsVibrant-quaternary" />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-3 pt-5">
          <InquiryInput name="title" placeholder="문의 제목을 입력해 주세요." maxLength={50} />
          <InquiryInput
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            disabled={!!email}
          />
          <InquiryCategoryButton />
          <InquiryTextarea name="content" maxLength={500} />
          <div className="flex-1" />
          <hr className="border border-labelsVibrant-quaternary" />
          <WriteImageSection />
        </form>
      </FormProvider>
    </div>
  );
};

export default page;
