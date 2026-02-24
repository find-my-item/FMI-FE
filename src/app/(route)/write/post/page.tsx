"use client";

import { Suspense, useState } from "react";
import NotFound from "@/app/not-found";
import { useFormContext } from "react-hook-form";
import { DetailHeader } from "@/components/layout";
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
import TempModal from "./_components/_internal/TempModal";
import useWritePageType from "./_hooks/useWritePageType/useWritePageType";
import useTempPostModal from "./_hooks/useTempPostModal/useTempPostModal";
import useTempPostActions from "./_hooks/useTempPostActions/useTempPostActions";

const WritePage = () => {
  const [overwriteModalOpen, setOverwriteModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const { isValid, title } = useWritePageType();
  if (!isValid) return <NotFound />;
  const methods = useFormContext<PostWriteFormValues>();
  const values = methods.watch();

  const { onSubmit, isPosting, canSubmit } = usePostWriteSubmit({ methods });
  const isSubmitDisabled = !canSubmit(values) || isPosting;

  const { data: tempPost, isLoading } = useGetTempPost();
  const { open: saveModalOpen, setOpen: setSaveModalOpen } = useTempPostModal(tempPost, isLoading);

  const { loadTempPost, saveTempPost } = useTempPostActions({
    methods,
    tempPost,
    values,
    setFormKey,
  });

  return (
    <>
      <DetailHeader title={title}>
        <HeaderSave onClick={() => setOverwriteModalOpen(true)} />
      </DetailHeader>

      <h1 className="sr-only">{`${title} 페이지`}</h1>

      <form key={formKey} onSubmit={onSubmit} className="flex flex-col h-base">
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
        <TempModal
          isOpen={saveModalOpen}
          onClose={() => setSaveModalOpen(false)}
          title="임시 저장한 내용을 불러오시겠습니까?"
          description="이전에 임시 저장한 내역이 있습니다."
          onConfirm={() => {
            loadTempPost();
            setSaveModalOpen(false);
          }}
          onCancel={() => setSaveModalOpen(false)}
          confirmText="불러올래요"
          cancelText="아니요"
        />
      )}

      <TempModal
        isOpen={overwriteModalOpen}
        onClose={() => setOverwriteModalOpen(false)}
        title="임시 저장한 내용을 덮어씌우겠습니까?"
        description="지금 임시 저장하면 이전 내용은 삭제됩니다."
        onConfirm={async () => {
          await saveTempPost();
          setOverwriteModalOpen(false);
        }}
        onCancel={() => setOverwriteModalOpen(false)}
        confirmText="덮어씌우기"
        cancelText="아니요"
      />
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
