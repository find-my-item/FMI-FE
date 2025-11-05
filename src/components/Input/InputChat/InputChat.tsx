"use client";

import { InputHTMLAttributes } from "react";
import { cn } from "@/utils";
import { RegisterOptions, useFormContext } from "react-hook-form";
import Icon from "@/components/Icon/Icon";

interface InputChatProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
  sendClick?: () => void;
  validation?: RegisterOptions;
}

const InputChat = ({ name, label, validation, sendClick, ...props }: InputChatProps) => {
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
      <input id="ImageAttach" type="file" accept="image/*" className="hidden" />

      {/* 입력창 */}
      <input
        {...props}
        className={cn(
          "h-11 min-w-0 flex-1 rounded-[24px] px-4 text-body2-medium text-neutral-normal-placeholder bg-fill-neutral-strong-default hover:placeholder-black focus:text-black disabled:text-neutral-strong-disabled",
          isValue && "text-neutral-strong-focused"
        )}
        placeholder="메시지 보내기"
        {...register(name, validation)}
      />

      {/* 전송 버튼 */}
      <button
        className="relative h-11 w-11 shrink-0 rounded-full bg-fill-brand-normal-disabled hover:bg-fill-brand-normal-disabled focus:bg-fill-brand-normal-default disabled:bg-fill-brand-normal-disabled"
        aria-label="전송 버튼"
        onClick={sendClick}
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
