"use client";

import { InputComment } from "@/components/common";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const NoticeCommentForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(() => {})}
        className="sticky bottom-0 left-0 right-0 mt-auto w-full border-t border-neutral-normal-default bg-white px-5 py-4"
      >
        <InputComment name="content" images={images} setImages={setImages} />
      </form>
    </FormProvider>
  );
};

export default NoticeCommentForm;
