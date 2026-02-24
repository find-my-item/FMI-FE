"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import NotFound from "@/app/not-found";
import { useSearchParams } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { useWriteStore } from "@/store";
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
import {
  useGetTempPost,
  usePostTempPost,
  TempPostWriteRequest,
  TempPostWriteRequestBody,
} from "@/api/fetch/post";
import TempModal from "./_components/_internal/TempModal";

const WritePage = () => {
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [overwriteModalOpen, setOverwriteModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const promptedRef = useRef(false);

  const searchParams = useSearchParams();
  const postType = searchParams.get("type");

  if (postType !== "lost" && postType !== "find") return <NotFound />;

  const { setPostType, setLatLng, setAddress, setFullAddress, setRadius } = useWriteStore();

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
  const { mutateAsync: postTempPost } = usePostTempPost();

  useEffect(() => {
    if (promptedRef.current) return;
    if (isLoading) return;

    if (tempPost?.result) {
      promptedRef.current = true;
      setSaveModalOpen(true);
    }
  }, [tempPost?.result, isLoading]);

  const handleLoadTempPost = () => {
    if (!tempPost?.result) return;
    const { result } = tempPost;

    setPostType(result.postType);
    setLatLng(result.latitude, result.longitude);
    setAddress(result.address);
    setFullAddress(result.address);
    setRadius(result.radius);

    const formattedData = {
      postType: result.postType,
      title: result.title || "",
      date: result.date || new Date().toISOString(),
      address: result.address || "",
      latitude: result.latitude,
      longitude: result.longitude,
      content: result.content || "",
      radius: result.radius,
      category: result.category,
      images: result.images.map((img) => ({
        id: img.id,
        previewUrl: img.imgUrl,
      })),
      temporarySave: false,
    };

    methods.reset(formattedData);
    setFormKey((prev) => prev + 1);
    setSaveModalOpen(false);
  };

  const handlePostTempPost = () => {
    const request: TempPostWriteRequest = {
      latitude: values.latitude ?? undefined,
      longitude: values.longitude ?? undefined,
      date: values.date,
      address: values.address,
      title: values.title,
      content: values.content,
      postType: values.postType || undefined,
      category: values.category || undefined,
      radius: values.radius ?? undefined,
      keepImageIdList: values.images.filter((image) => image.id).map((image) => String(image.id)),
    };

    const formData = new FormData();
    formData.append("request", new Blob([JSON.stringify(request)], { type: "application/json" }));

    values.images.forEach((image) => {
      if (image.file) {
        formData.append("images", image.file);
      }
    });

    postTempPost(formData as unknown as TempPostWriteRequestBody);
    setOverwriteModalOpen(false);
  };

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
          onConfirm={handleLoadTempPost}
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
        onConfirm={handlePostTempPost}
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
