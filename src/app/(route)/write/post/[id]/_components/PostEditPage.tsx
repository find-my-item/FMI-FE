"use client";

import NotFound from "@/app/not-found";
import { useFormContext } from "react-hook-form";
import { DetailHeader } from "@/components/layout";
import { useGetDetailPost } from "@/api/fetch/post";
import { PostWriteFormValues } from "../../_types/PostWriteType";
import usePostEditSubmit from "../../_hooks/usePostEditSubmit/usePostEditSubmit";
import usePostEditInit from "../../_hooks/usePostEditInit/usePostEditInit";
import {
  ActionSection,
  CategorySection,
  ContentSection,
  ImageSection,
  LocationSection,
  TitleSection,
} from "../../_components/_internal";

interface PostEditPageProps {
  postId: number;
}

const PostEditPage = ({ postId }: PostEditPageProps) => {
  const methods = useFormContext<PostWriteFormValues>();
  const values = methods.watch();

  const { data, isLoading, isError } = useGetDetailPost({ id: postId });

  usePostEditInit({ data: data?.result ?? null, methods });

  const { onSubmit, isPosting, canSubmit } = usePostEditSubmit({ postId, methods });
  const isSubmitDisabled = !canSubmit(values) || isPosting;

  const title = data?.result?.postType === "LOST" ? "분실했어요 수정" : "발견했어요 수정";

  if (isLoading) return <div className="pt-4 h-base">로딩중</div>;
  if (isError || !data?.result) return <NotFound />;
  if (!data.result.isMine) return <NotFound />;

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

export default PostEditPage;
