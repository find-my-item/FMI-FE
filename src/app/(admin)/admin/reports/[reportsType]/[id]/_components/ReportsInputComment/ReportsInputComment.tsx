"use client";

import { FormProvider, useForm } from "react-hook-form";
import { InputCommentField } from "@/components/common";
import { ReportsType } from "../../_types/ReportsType";
import { usePostReportsComment } from "../../_hooks/usePostReportsComment";

interface ReportsInputCommentProps {
  reportsId: number;
  reportsType: ReportsType;
}

const ReportsInputComment = ({ reportsId, reportsType }: ReportsInputCommentProps) => {
  const methods = useForm<{ content: string }>();

  const { mutateAsync, isPending } = usePostReportsComment({
    reportsId,
    reportsType,
  });

  const onSubmit = async (data: { content: string }) => {
    await mutateAsync(data);
    methods.reset({ content: "" });
  };

  return (
    <FormProvider {...methods}>
      <form
        className="sticky bottom-0 left-0 right-0 z-10 mt-auto w-full border-t border-neutral-normal-default bg-white px-5 py-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <InputCommentField name="content" images={[]} setImages={() => {}} disabled={isPending} />
      </form>
    </FormProvider>
  );
};

export default ReportsInputComment;
