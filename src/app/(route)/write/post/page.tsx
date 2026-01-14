"use client";

import { Suspense, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CategoryType } from "@/types";
import { useWriteStore } from "@/store";
import { DetailHeader } from "@/components/layout";
import { ConfirmModal } from "@/components/common";
import { PostWriteFormValues } from "./_types/PostWriteType";
import { PostPostsWriteRequestBody, usePostPosts } from "@/api/fetch/post";
import {
  ActionSection,
  CategorySection,
  ContentSection,
  ImageSection,
  LocationSection,
  TitleSection,
} from "./_components";

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

  const { lat, lng, location, radius, type } = useWriteStore();

  const methods = useForm<PostWriteFormValues>({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  useEffect(() => {
    methods.setValue("postType", type ?? "", { shouldValidate: true });
    methods.setValue("address", location ?? "", { shouldValidate: true });
    methods.setValue("latitude", lat ?? null, { shouldValidate: true });
    methods.setValue("longitude", lng ?? null, { shouldValidate: true });
    methods.setValue("radius", radius ?? null, { shouldValidate: true });
  }, [type, location, lat, lng, radius, methods]);

  const { mutateAsync: postPosts } = usePostPosts();

  const toPostWriteRequestBody = (
    values: PostWriteFormValues
  ): PostPostsWriteRequestBody | null => {
    if (!type || !values.category) return null;

    return {
      request: {
        postType: type,
        title: values.title,
        category: values.category as CategoryType,
        content: values.content,
        address: location,
        latitude: lat,
        longitude: lng,
        radius: radius,
        date: new Date().toISOString(),
        temporarySave: values.temporarySave,
      },
      images: values.images.map((img) => img.file),
    };
  };

  const onSubmit = methods.handleSubmit((values) => {
    // console.log("RHF values:", values);
    // console.log("Zustand:", useWriteStore.getState());
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
