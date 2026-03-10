"use client";

import { FormProvider, useForm } from "react-hook-form";
import { InputCommentField } from "@/components/common";

interface ReportsInputCommentProps {
  reportsId: number;
  reportsType: string;
}

const ReportsInputComment = ({ reportsId, reportsType }: ReportsInputCommentProps) => {
  const methods = useForm<{ content: string }>();

  return (
    <FormProvider {...methods}>
      <form
        className="sticky bottom-0 left-0 right-0 z-10 mt-auto w-full border-t border-neutral-normal-default bg-white px-5 py-4"
        onSubmit={() => {}}
      >
        <InputCommentField name="content" images={[]} setImages={() => {}} disabled={false} />
      </form>
    </FormProvider>
  );
};

export default ReportsInputComment;
