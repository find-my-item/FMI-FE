"use client";

import { TextareaHTMLAttributes, useState } from "react";
import { FormProvider, RegisterOptions, useForm } from "react-hook-form";
import { useToast } from "@/context/ToastContext";
import { resizeImage } from "@/utils";
import InputCommentField from "./_internal/InputCommentField";

export interface InputCommentSubmitPayload {
  content: string;
  images: File[];
}

export type InputCommentOnSubmitApi = (payload: InputCommentSubmitPayload) => Promise<void>;

interface InputCommentProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
  name?: string;
  validation?: RegisterOptions;
  disabled?: boolean;
  onSubmitApi: InputCommentOnSubmitApi;
}

/**
 * @author hyungjun
 *
 * 댓글 입력용 공통 컴포넌트입니다.
 * FormProvider·이미지 state·검증·리사이징·전송 후 클리어를 내부에서 처리하며,
 * 사용처는 onSubmitApi만 넘기면 됩니다.
 *
 * @example
 * ```tsx
 * <InputComment
 *   onSubmitApi={async ({ content, images }) => {
 *     await createCommentApi({ postId, content, images });
 *   }}
 * />
 * ```
 */

const DEFAULT_NAME = "content";

const InputComment = ({
  name = DEFAULT_NAME,
  validation,
  disabled,
  onSubmitApi,
}: InputCommentProps) => {
  const [images, setImages] = useState<File[]>([]);
  const { addToast } = useToast();
  const methods = useForm<{ [key: string]: string }>({
    defaultValues: { [name]: "" },
    mode: "onChange",
  });

  const handleSubmit = methods.handleSubmit(async (data) => {
    const content = (data[name] as string)?.trim() ?? "";
    if (!content && images.length === 0) return;

    try {
      const resizedImages =
        images.length > 0 ? await Promise.all(images.map((file) => resizeImage(file))) : [];
      await onSubmitApi({ content, images: resizedImages });
      methods.reset();
      setImages([]);
    } catch {
      addToast("전송에 실패했습니다.", "error");
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <InputCommentField
          name={name}
          validation={validation}
          disabled={disabled}
          images={images}
          setImages={setImages}
        />
      </form>
    </FormProvider>
  );
};

export default InputComment;
