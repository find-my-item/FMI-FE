"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { DetailHeader } from "@/components/layout";
import { ConfirmModal } from "@/components/common";
import { PostWriteFormValues } from "./_types/PostWriteType";
import usePostWriteSubmit from "./_hooks/usePostWriteSubmit/usePostWriteSubmit";
import {
  ActionSection,
  CategorySection,
  ContentSection,
  ImageSection,
  LocationSection,
  TitleSection,
} from "./_components";
import { useWriteStore } from "@/store";
import NotFound from "@/app/not-found";

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
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const postType = searchParams.get("type");

  if (postType !== "lost" && postType !== "find") return <NotFound />;

  const { setPostType } = useWriteStore();

  useEffect(() => {
    if (postType === "lost") setPostType("LOST");
    if (postType === "find") setPostType("FOUND");
  }, [postType, setPostType]);

  const methods = useForm<PostWriteFormValues>({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const { onSubmit, isPosting, canSubmit } = usePostWriteSubmit({ methods });
  const values = methods.watch();
  const isSubmitDisabled = !canSubmit(values) || isPosting;

  return (
    <>
      <DetailHeader title={postType === "lost" ? "분실했어요 글쓰기" : "습득했어요 글쓰기"}>
        <DetailHeader.Save onClick={() => setSaveModalOpen(true)} />
      </DetailHeader>
      <h1 className="sr-only">분실/습득 등록 페이지</h1>

      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="flex flex-col h-base">
          <ImageSection />

          <CategorySection />

          <TitleSection />

          <ContentSection />

          <LocationSection />

          <ActionSection disabled={isSubmitDisabled} />
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
