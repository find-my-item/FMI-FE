"use client";

import { Suspense } from "react";
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
import useWritePageType from "./_hooks/useWritePageType/useWritePageType";

const WritePage = () => {
  const { isValid, title } = useWritePageType();
  if (!isValid) return <NotFound />;
  const methods = useFormContext<PostWriteFormValues>();
  const values = methods.watch();

  const { onSubmit, isPosting, canSubmit } = usePostWriteSubmit({ methods });
  const isSubmitDisabled = !canSubmit(values) || isPosting;

  return (
    <>
      <DetailHeader title={title} />

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
