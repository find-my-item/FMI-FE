"use client";

import { FormProvider, useForm } from "react-hook-form";
import { InputCommentField } from "@/components/common";
import { usePostCommentSubmit } from "../../_hooks/usePostCommentSubmit/usePostCommentSubmit";
import { cn } from "@/utils";

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
        className={cn(
          "sticky bottom-0 left-0 right-0 z-[9999] w-full gap-[6px] border-t px-5 py-4",
          "flex items-center justify-between border-border-neutral-normal-default bg-white"
        )}
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
