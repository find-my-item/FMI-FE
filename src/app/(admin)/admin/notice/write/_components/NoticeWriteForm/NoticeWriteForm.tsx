"use client";

import { UseFormReturn, useWatch } from "react-hook-form";
import { NoticeWriteFormValues } from "../../_types/NoticeWriteType";
import { TitleInput, ContentInput, CategoryInput } from "./_internal";
import { WriteImageSection, WriteActionSection } from "@/components/domain";
import { usePostNotices } from "@/api/fetch/admin";
import { useDeleteS3, usePostS3 } from "@/api/fetch/s3";

const IMAGE_HELP_TEXT = "*사진은 최대 5장 첨부가 가능합니다. (선택)";

const canSubmit = (values: NoticeWriteFormValues): boolean =>
  Boolean(values.title?.trim() && values.category && values.content?.trim());

const NoticeWriteForm = ({ methods }: { methods: UseFormReturn<NoticeWriteFormValues> }) => {
  const values = useWatch({ control: methods.control });
  const isSubmitDisabled = !canSubmit(values as NoticeWriteFormValues);
  const { mutate: postNotice } = usePostNotices();
  const { mutate: postS3 } = usePostS3();
  const { mutate: deleteS3 } = useDeleteS3();

  const onSubmit = (data: NoticeWriteFormValues) => {
    const { images, ...rest } = data;
    const files = images.map((i) => i.file).filter((f): f is File => f != null);

    const submitNotice = (imageUrls: string[]) =>
      postNotice(
        { ...rest, imageUrls },
        { onError: () => imageUrls.length > 0 && deleteS3(imageUrls) }
      );

    if (files.length === 0) return submitNotice([]);

    const formData = new FormData();
    files.forEach((f) => formData.append("image", f));
    postS3(formData, { onSuccess: ({ result }) => submitNotice(result) });
  };

  return (
    // TODO(형준): 내부 input 컴포넌트 value 있을 때 스타일 구현 필요
    <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col h-base">
      <TitleInput />
      <CategoryInput />
      <ContentInput />
      <WriteImageSection helpText={IMAGE_HELP_TEXT} />
      <div className="sticky bottom-0 w-full max-w-[764px] border-t border-divider-default bg-white">
        <WriteActionSection disabled={isSubmitDisabled} />
      </div>
    </form>
  );
};

export default NoticeWriteForm;
