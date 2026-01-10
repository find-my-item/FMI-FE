"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { DetailHeader } from "@/components/layout";
import { ConfirmModal } from "@/components/common";
import {
  ActionSection,
  CategorySection,
  ContentSection,
  ImageSection,
  LocationSection,
  TitleSection,
} from "./_components";
import { PostWriteFormValues } from "./_types/PostWriteType";
import { usePostPosts } from "@/api/fetch/post";
import type { PostPostsWriteRequestBody } from "@/api/fetch/post";
import { CategoryType, PostType } from "@/types";

const defaultValues: PostWriteFormValues = {
  postType: "",
  title: "",
  date: "",
  address: "",
  latitude: null,
  longitude: null,
  radius: null,
  category: "",
  content: "",
  images: [],
  temporarySave: false,
};

const WritePage = () => {
  const [disabled, setDisabled] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const methods = useForm<PostWriteFormValues>({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const { mutateAsync: postPosts } = usePostPosts();

  const toPostWriteRequestBody = (
    values: PostWriteFormValues
  ): PostPostsWriteRequestBody | null => {
    if (!values.postType || !values.category) return null;

    return {
      request: {
        postType: values.postType as PostType,
        title: values.title,
        category: values.category as CategoryType,
        content: values.content,
        address: values.address,
        latitude: values.latitude as number,
        longitude: values.longitude as number,
        radius: values.radius as number,
        date: values.date,
        temporarySave: values.temporarySave,
      },
      images: values.images.map((img) => img.file),
    };
  };

  const onSubmit = methods.handleSubmit((values) => {
    // console.log(values);
    const body = toPostWriteRequestBody(values);

    if (!body) return;

    // console.log(body);
    postPosts(body);
  });

  return (
    <>
      <DetailHeader title="분실했어요 글쓰기">
        <DetailHeader.Save onClick={() => setSaveModalOpen(true)} />
      </DetailHeader>
      <h1 className="sr-only">분실/습득 등록 페이지</h1>

      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="flex flex-col">
          <ImageSection />

          <CategorySection />

          <TitleSection />

          <ContentSection />

          <LocationSection />

          <ActionSection disabled={disabled} />
        </form>

        <ConfirmModal
          size="small"
          isOpen={saveModalOpen}
          onClose={() => setSaveModalOpen(false)}
          title="임시 저장한 게시글이 있습니다."
          content="임시 저장한 내용을 불러오시겠어요?"
          onConfirm={() => setSaveModalOpen(false)}
          onCancel={() => setSaveModalOpen(false)}
        />
      </FormProvider>
    </>
  );
};

const Page = () => {
  return (
    <Suspense fallback={null}>
      <WritePage />
    </Suspense>
  );
};

export default Page;
