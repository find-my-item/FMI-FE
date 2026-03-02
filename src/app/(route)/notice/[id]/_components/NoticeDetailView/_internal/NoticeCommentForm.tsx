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
        className="border-t border-neutral-normal-default px-5 py-4"
      >
        <InputComment name="content" images={images} setImages={setImages} />
      </form>
    </FormProvider>
  );
};

export default NoticeCommentForm;
