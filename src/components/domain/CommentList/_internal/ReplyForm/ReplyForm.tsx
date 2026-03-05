import { ChangeEvent, FormEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button, Icon } from "@/components/common";
import { cn } from "@/utils";
import { usePostPostsComments } from "@/api/fetch/comment";

interface ReplyFormProps {
  isThreadItem: boolean;
  className?: string;
  disabled?: boolean;
  parentId: number;
}

const ReplyForm = ({ isThreadItem, className, disabled, parentId }: ReplyFormProps) => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const { mutate, isPending } = usePostPostsComments(postId, parentId);
  const inputId = useId();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const previewUrl = useMemo(() => {
    if (!image) return "";
    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";

    const nextHeight = Math.min(el.scrollHeight, 200);
    el.style.height = `${nextHeight}px`;

    el.style.overflowY = el.scrollHeight > 200 ? "auto" : "hidden";
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    requestAnimationFrame(resizeTextarea);
  };

  useEffect(() => {
    resizeTextarea();
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
      e.target.value = "";
    }
  };

  // 분리 필요
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending || !content.trim()) return;

    const formData = new FormData();
    const request = { postId, content, parentId };

    formData.append("request", new Blob([JSON.stringify(request)], { type: "application/json" }));
    if (image) {
      formData.append("images", image);
    }

    mutate(formData, {
      onSuccess: () => {
        setContent("");
        setImage(null);
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "mt-2 w-full rounded-[10px] px-4 py-[10px]",
        isThreadItem ? "bg-white" : "bg-fill-neutral-strong-default",
        className
      )}
    >
      <div className="flex w-full items-start gap-5 pb-4">
        <textarea
          id="reply-form-textarea"
          ref={textareaRef}
          placeholder="답글 작성란"
          maxLength={500}
          value={content}
          onChange={handleChange}
          rows={1}
          className={cn(
            "flex-1 resize-none overflow-hidden pt-1",
            isThreadItem ? "bg-white" : "bg-fill-neutral-strong-default",
            "placeholder:text-body1-medium placeholder:text-neutral-strong-placeholder"
          )}
        />

        <div className="relative">
          {image && (
            <>
              <Image
                src={previewUrl}
                alt=""
                width={60}
                height={60}
                className="size-[60px] rounded-[16px] object-cover"
              />

              <div className="absolute inset-0 rounded-[16px] bg-gradient-to-b from-black/10 to-transparent" />

              <button
                type="button"
                aria-label="이미지 삭제"
                className="absolute right-1.5 top-1 z-10"
                onClick={() => setImage(null)}
              >
                <Icon name="XSecond" size={16} className="text-white" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        <p className="text-body2-regular text-neutral-strong-placeholder">{content.length}/500</p>

        <div className="gap-2 flex-center">
          <input
            id={inputId}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          <label
            htmlFor={inputId}
            aria-label="이미지 추가"
            className="size-11 cursor-pointer rounded-full bg-white flex-center"
          >
            <Icon name="Image" size={20} className="text-neutralInversed-normal-default" />
          </label>

          <Button
            aria-label="댓글 등록"
            className="min-h-11 !min-w-[52px] rounded-full px-3"
            type="submit"
            disabled={disabled || isPending || !content.trim()}
          >
            등록
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ReplyForm;
