"use client";

import { UseFormReturn, useWatch } from "react-hook-form";
import { NoticeWriteFormValues } from "../../_types/NoticeWriteType";
import { TitleInput, ContentInput, CategoryInput } from "./_internal";
import { WriteImageSection, WriteActionSection } from "@/components/domain";
import { usePostNotices } from "@/api/fetch/admin";

const IMAGE_HELP_TEXT = "*사진은 최대 5장 첨부가 가능합니다. (선택)";

const canSubmit = (values: NoticeWriteFormValues): boolean =>
  Boolean(values.title?.trim() && values.category && values.content?.trim());

const NoticeWriteForm = ({ methods }: { methods: UseFormReturn<NoticeWriteFormValues> }) => {
  const values = useWatch({ control: methods.control });
  const isSubmitDisabled = !canSubmit(values as NoticeWriteFormValues);
  const { mutate: postNotice } = usePostNotices();

  const onSubmit = (data: NoticeWriteFormValues) => {
    const { images: imageUrls, ...rest } = data;
    postNotice({ ...rest, imageUrls });
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
