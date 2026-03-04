// TODO(지권): 디자인 토큰 적용 필요

"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { InputCommentField } from "@/components/common";
import { usePostPostsComments } from "@/api/fetch/comment";

interface PostInputCommentProps {
  postId: number;
}

const PostInputComment = ({ postId }: PostInputCommentProps) => {
  const [images, setImages] = useState<File[]>([]);
  const methods = useForm<{ content: string }>();
  const { mutate } = usePostPostsComments(postId);

  const onCommentSubmit = (data: { content: string }) => {
    const formData = new FormData();
    const request = { content: data.content };
    formData.append("request", new Blob([JSON.stringify(request)], { type: "application/json" }));
    images.forEach((image) => formData.append("images", image));
    mutate(formData);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="sticky bottom-0 left-0 right-0 z-[9999] flex w-full items-center justify-between gap-[6px] border-t border-[#E4E4E4] bg-white px-5 py-4"
        onSubmit={methods.handleSubmit(onCommentSubmit)}
      >
        <InputCommentField name="content" images={images} setImages={setImages} />
      </form>
    </FormProvider>
  );
};

export default PostInputComment;
