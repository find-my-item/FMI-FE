import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import InputCommentImageSection from "./InputCommentImageSection";
import { Icon } from "@/components/common";
import { cn, fileInputHandler, textareaAutoResize, textareaSubmitKeyHandler } from "@/utils";

interface InputCommentFieldProps {
  name: string;
  validation?: RegisterOptions;
  disabled?: boolean;
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
}

const InputCommentField = ({
  name,
  validation,
  disabled,
  images,
  setImages,
}: InputCommentFieldProps) => {
  const { control } = useFormContext();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <>
      {images.length > 0 && <InputCommentImageSection images={images} setImages={setImages} />}
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => (
          <div className="flex w-full flex-row items-end gap-2 overflow-y-visible">
            <label
              htmlFor="ImageAttach"
              className="relative h-11 w-11 shrink-0 rounded-full bg-fill-neutral-strong-default"
              aria-label="이미지 첨부"
              role="button"
            >
              <Icon
                name="Image"
                size={20}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </label>
            <input
              id="ImageAttach"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              disabled={disabled}
              onChange={(e) => fileInputHandler(e, images, setImages)}
            />

            <textarea
              {...field}
              ref={(el) => {
                field.ref(el);
                textareaRef.current = el;
              }}
              rows={1}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                field.onChange(e);
                textareaAutoResize(e.target);
              }}
              onKeyDown={(e) => textareaSubmitKeyHandler(e, textareaRef)}
              className={cn(
                "max-h-[120px] min-h-11 min-w-0 flex-1 resize-none overflow-y-hidden rounded-[24px] px-4 py-[10px] text-body2-medium text-neutral-normal-placeholder bg-fill-neutral-strong-default",
                "hover:placeholder-black focus:text-black disabled:text-neutral-strong-disabled",
                field.value && "text-neutral-strong-focused"
              )}
              placeholder="메시지 보내기"
              disabled={disabled}
            />

            <button
              type="submit"
              className={cn(
                "relative h-11 w-11 shrink-0 rounded-full bg-fill-brand-normal-default",
                "hover:bg-fill-brand-normal-disabled active:bg-fill-brand-normal-default disabled:bg-fill-brand-normal-disabled"
              )}
              aria-label="전송 버튼"
              disabled={disabled || (!field.value?.trim() && images.length === 0)}
            >
              <Icon
                name="Send"
                size={20}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            </button>
          </div>
        )}
      />
    </>
  );
};

export default InputCommentField;
