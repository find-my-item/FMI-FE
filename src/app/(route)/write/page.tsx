"use client";

import { DetailHeader } from "@/components/layout";
import { ConfirmModal } from "@/components";
import { useState } from "react";
import {
  ActionSection,
  ContentSection,
  ImageSection,
  LocationSection,
  TitleSection,
  CategorySection,
} from "./_components";

const Page = () => {
  const [disabled, setDisabled] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className="sr-only">분실/습득 등록 페이지</h1>
      <DetailHeader title="분실했어요 글쓰기">
        <DetailHeader.Save onClick={() => setSaveModalOpen(true)} />
      </DetailHeader>

      <form onSubmit={handleSubmit} className="flex flex-col">
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
    </>
  );
};

export default Page;
