"use client";

import { InputHTMLAttributes } from "react";
import { cn } from "@/utils";
import { RegisterOptions, useFormContext } from "react-hook-form";
import Icon from "@/components/Icon/Icon";

/**
 * @author suhyeon
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
 *  - 'sendClick': 사진 전송 및 입력필드의 전송 버튼 함수
 *
 * @example
 * ```tsx
 * <FormProvider {...methods}>
 *   <form onSubmit={methods.handleSubmit(onSubmit)}>
 *     <InputChat
 *       name="message"
 *       validation={{ required: "메시지를 입력해 주세요" }}
 *       sendClick={() => methods.handleSubmit(onSubmit)()}
 *     />
 *   </form>
 * </FormProvider>
 *
 */

interface InputChatProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  validation?: RegisterOptions;
  disabled?: boolean;
  sendClick?: () => void;
}

const InputChat = ({ name, validation, disabled, sendClick, ...props }: InputChatProps) => {
  const { register, watch } = useFormContext();
  const isValue = watch(name) ?? "";

  return (
    <div className="flex w-full flex-row gap-2">
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
      <input id="ImageAttach" type="file" accept="image/*" className="hidden" disabled={disabled} />

      {/* 입력창 */}
      <input
        id={name}
        {...props}
        {...register(name, validation)}
        className={cn(
          "h-11 min-w-0 flex-1 rounded-[24px] px-4 text-body2-medium text-neutral-normal-placeholder bg-fill-neutral-strong-default hover:placeholder-black focus:text-black disabled:text-neutral-strong-disabled",
          isValue && "text-neutral-strong-focused"
        )}
        placeholder="메시지 보내기"
        disabled={disabled}
      />

      {/* 전송 버튼 */}
      <button
        className="relative h-11 w-11 shrink-0 rounded-full bg-fill-brand-normal-disabled hover:bg-fill-brand-normal-disabled focus:bg-fill-brand-normal-default disabled:bg-fill-brand-normal-disabled"
        aria-label="전송 버튼"
        onClick={sendClick}
        disabled={disabled}
      >
        <Icon
          name="Send"
          size={20}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </button>
    </div>
  );
};

export default InputChat;
