"use client";

import { FormProvider, useForm } from "react-hook-form";
import { InputCommentField } from "@/components/common";
import { usePostCommentSubmit } from "../../_hooks/usePostCommentSubmit/usePostCommentSubmit";

interface PostInputCommentProps {
  postId: number;
}

const PostInputComment = ({ postId }: PostInputCommentProps) => {
  const methods = useForm<{ content: string }>();
  const { handleCommentSubmit, isPending, images, setImages } = usePostCommentSubmit({
    postId,
    methods,
  });

  return (
    <FormProvider {...methods}>
      <form
        className="sticky bottom-0 left-0 right-0 z-[9999] mt-auto w-full border-t border-neutral-normal-default bg-white px-5 py-4"
        onSubmit={methods.handleSubmit(handleCommentSubmit)}
      >
        <InputCommentField
          name="content"
          images={images}
          setImages={setImages}
          disabled={isPending}
        />
      </form>
    </FormProvider>
  );
};

export default PostInputComment;
