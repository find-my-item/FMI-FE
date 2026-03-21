"use client";

import { usePostUserInquiry } from "@/api/fetch/inquiry/api/usePostUserInquiry";
import { InputComment } from "@/components/common";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface InquiryFormType {
  comment: string;
}

const InquiryInputComment = ({ id: inquiryId }: { id: number }) => {
  const methods = useForm<InquiryFormType>();
  const [images, setImages] = useState<File[]>([]);
  const { mutate: postInquiryMutate, isPending } = usePostUserInquiry({ inquiryId });

  const onSubmit = async (data: InquiryFormType) => {
    const comment = data.comment.trim();
    if (!comment || isPending) return;

    const formData = new FormData();
    formData.append(
      "comment",
      new Blob(
        [
          JSON.stringify({
            content: comment,
          }),
        ],
        { type: "application/json" }
      )
    );

    if (images)
      images.forEach((img) => {
        formData.append("images", img);
      });

    await postInquiryMutate(formData);
    methods.setValue("comment", "");
    setImages([]);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="sticky bottom-0 left-0 right-0 z-10 mt-auto w-full border-t border-neutral-normal-default bg-white px-5 py-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
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
