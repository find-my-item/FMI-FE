"use client";

import { InputComment } from "@/components/common";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { InquiryFormType } from "../../_types/InquiryFormType";
import { useSubmitInquiry } from "../../_hooks/useSubmitInquiry";

const InquiryInputComment = ({ id: inquiryId }: { id: number }) => {
  const methods = useForm<InquiryFormType>();
  const [images, setImages] = useState<File[]>([]);

  const { onSubmit, isPending } = useSubmitInquiry({
    images,
    setImages,
    inquiryId,
    setValue: methods.setValue,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InputComment
          name="comment"
          validation={{ required: true }}
          disabled={isPending}
          images={images}
          setImages={setImages}
        />
      </form>
    </FormProvider>
  );
};

export default InquiryInputComment;
