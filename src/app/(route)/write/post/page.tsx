"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import NotFound from "@/app/not-found";
import { useSearchParams } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { useWriteStore } from "@/store";
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
import { HeaderSave } from "@/components/layout/DetailHeader/DetailHeaderParts";
import { useGetTempPost } from "@/api/fetch/post";

const WritePage = () => {
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const promptedRef = useRef(false);

  const searchParams = useSearchParams();
  const postType = searchParams.get("type");

  if (postType !== "lost" && postType !== "find") return <NotFound />;

  const { setPostType } = useWriteStore();

  useEffect(() => {
    if (postType === "lost") setPostType("LOST");
    if (postType === "find") setPostType("FOUND");
  }, [postType, setPostType]);

  const methods = useFormContext<PostWriteFormValues>();

  const { onSubmit, isPosting, canSubmit } = usePostWriteSubmit({ methods });
  const values = methods.watch();
  const isSubmitDisabled = !canSubmit(values) || isPosting;

  const title = postType === "lost" ? "분실했어요 글쓰기" : "발견했어요 글쓰기";
  const { data: tempPost, isLoading } = useGetTempPost();
  console.log(tempPost);

  useEffect(() => {
    if (promptedRef.current) return;
    if (isLoading) return;

    if (tempPost?.result) {
      promptedRef.current = true;
      setSaveModalOpen(true);
    }
  }, [tempPost?.result, isLoading]);

  return (
    <>
      <DetailHeader title={title}>
        <HeaderSave onClick={() => setSaveModalOpen(true)} />
      </DetailHeader>
      <h1 className="sr-only">{`${title} 페이지`}</h1>

      <form onSubmit={onSubmit} className="flex flex-col h-base">
        <div className="flex min-h-0 flex-1 flex-col">
          <ImageSection />
          <CategorySection />
          <TitleSection />

          <ContentSection />

          <LocationSection />
        </div>

        <ActionSection disabled={isSubmitDisabled} />
      </form>

      {tempPost?.result && (
        <ConfirmModal
          size="small"
          isOpen={saveModalOpen}
          onClose={() => setSaveModalOpen(false)}
          title="임시 저장한 게시글이 있습니다."
          content="임시 저장한 내용을 불러오시겠어요?"
          onConfirm={() => setSaveModalOpen(false)}
          onCancel={() => setSaveModalOpen(false)}
        />
      )}
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
