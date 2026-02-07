import { useChatRoom } from "@/providers/ChatRoomProvider";
import { ChangeEvent, TextareaHTMLAttributes, useRef } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import Icon from "../../Icon/Icon";
import {
  adjustTextareaHeight,
  appendImageFilesFromInput,
  handleTextareaSubmitKeyDown,
} from "@/utils";
import { cn } from "@/utils";
import InputCommentImageSection from "./_internal/InputCommentImageSection";

interface InputChatProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  validation?: RegisterOptions;
  disabled?: boolean;
}

const InputComment = ({ name, validation, disabled, ...props }: InputChatProps) => {
  const { control } = useFormContext();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { images, setImages } = useChatRoom();

  return (
    <>
      {images?.length !== 0 && <InputCommentImageSection />}
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => (
          <div className="flex w-full flex-row items-end gap-2 overflow-y-visible">
            {/* 이미지 첨부 */}
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
              onChange={(e) => appendImageFilesFromInput(e, images, setImages)}
            />

            {/* 입력창 */}
            <textarea
              {...props}
              {...field}
              ref={(e) => {
                field.ref(e);
                textareaRef.current = e;
              }}
              rows={1}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                field.onChange(e);
                adjustTextareaHeight(e.target);
              }}
              onKeyDown={(e) => handleTextareaSubmitKeyDown(e, textareaRef)}
              className={cn(
                "max-h-[120px] min-h-11 min-w-0 flex-1 resize-none overflow-y-hidden rounded-[24px] px-4 py-[10px] text-body2-medium text-neutral-normal-placeholder bg-fill-neutral-strong-default hover:placeholder-black focus:text-black disabled:text-neutral-strong-disabled",
                field.value && "text-neutral-strong-focused"
              )}
              placeholder="메시지 보내기"
              disabled={disabled}
            />

            {/* 전송 버튼 */}
            <button
              type="submit"
              className="relative h-11 w-11 shrink-0 rounded-full bg-fill-brand-normal-default hover:bg-fill-brand-normal-disabled active:bg-fill-brand-normal-default disabled:bg-fill-brand-normal-disabled"
              aria-label="전송 버튼"
              disabled={disabled || !field.value?.trim()}
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

export default InputComment;
