"use client";

import { ChangeEvent, FormEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Button, Icon } from "@/components/common";
import { cn } from "@/utils";

interface ReplyFormProps {
  isThreadItem: boolean;
  className?: string;
  disabled?: boolean;
  onSubmit: (content: string, image: File | null) => void;
  isPending?: boolean;
}

/**
 * @description
 * 댓글의 답글(대댓글)을 작성하기 위한 공통 UI 컴포넌트입니다.
 *
 * - 텍스트 입력 및 자동 높이 조절
 * - 이미지 첨부 및 미리보기/삭제
 * - 글자 수 제한 표시 (500자)
 *
 * - `onSubmit` 핸들러에서 API 호출 로직 구현
 * - `isPending` 상태를 넘겨주어 등록 중 버튼 비활성화 처리
 *
 * @param isThreadItem - 스레드(답글) 형태의 배경색 적용 여부
 * @param className - 추가적인 스타일 클래스
 * @param disabled - 전체 비활성화 여부
 * @param onSubmit - 등록 버튼 클릭 시 실행될 콜백 (내용, 이미지 전달)
 * @param isPending - 등록 중 상태 (버튼 비활성화)
 */
const ReplyForm = ({ isThreadItem, className, disabled, onSubmit, isPending }: ReplyFormProps) => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending || !content.trim()) return;

    setContent("");
    setImage(null);
    onSubmit(content, image);
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
          autoFocus={true}
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
