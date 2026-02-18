"use client";

import { ChangeEvent, TextareaHTMLAttributes, useRef, useState } from "react";
import { cn, textareaAutoResize, fileInputHandler, textareaSubmitKeyHandler } from "@/utils";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { Icon } from "@/components/common";
import InputChatImageSection from "./_internal/InputChatImageSection";
import { SelectedImage } from "@/types/SelectedImage";

/**
 * @author hyungjun
 *
 * 채팅을 위한 input 공통 컴포넌트 입니다.
 * react-hook-form을 필수로 사용한다는 전제하에 개발하였습니다.
 * 사용하실 곳의 상위 요소로 FormProvider를 사용해주시고 method는 onChange 모드로 설정하시면 됩니다.
 *
 *
 * @param items - 채팅 input props와 채팅 전송 버튼에 관련한 props입니다.
 *  - 'name': 입력 필드의 id 및 register함수 사용을 위한 name
 *  - `validation`: 입력 필드의 유효성 검사를 위한 RegisterOption (기본적으로는 name만 사용하셔도 무방하지만 혹시모르기에 props로 추가해두었습니다.)
 *  - `disabled`: 사진 첨부, 입력 필드, 전송 버튼 disabled 처리를 위한 인수
 *
 * @example
 * ```tsx
 * <FormProvider {...methods}>
 *   <form onSubmit={methods.handleSubmit(onSubmit)}>
 *     <InputChat
 *       name="message"
 *       validation={{ required: true }}
 *     />
 *   </form>
 * </FormProvider>
 *
 */

interface InputChatProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  validation?: RegisterOptions;
  disabled?: boolean;
  roomId: number;
  userId: number;
}

const InputChat = ({ name, validation, disabled, roomId, userId, ...props }: InputChatProps) => {
  const { control } = useFormContext();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);

  return (
    <>
      {images?.length !== 0 ? (
        <InputChatImageSection
          ids={{ roomId, userId }}
          imageState={{
            images,
            setImages,
            selectedImages,
            setSelectedImages,
          }}
        />
      ) : (
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
                onChange={(e) => fileInputHandler(e, images, setImages)}
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
                  textareaAutoResize(e.target);
                }}
                onKeyDown={(e) => textareaSubmitKeyHandler(e, textareaRef)}
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
      )}
    </>
  );
};

export default InputChat;
