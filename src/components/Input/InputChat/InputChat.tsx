"use client";

import { InputHTMLAttributes } from "react";
import { cn } from "@/utils";
import { RegisterOptions, useFormContext } from "react-hook-form";
import Icon from "@/components/Icon/Icon";

/**
 * @author hyungjun
 *
 * 여러 메뉴 항목을 세로로 나열한 Kebab 스타일 메뉴 컴포넌트입니다.
 * 각 항목은 텍스트와 아이콘을 가질 수 있으며, 로딩 상태와 비활성 상태를 지원합니다.
 *
 * @param items - 메뉴 항목들의 배열입니다. 각 항목은 `KebabMenuItem` 형태로 구성됩니다.
 *  - `text`: 버튼에 표시할 콘텐츠 (텍스트 또는 ReactNode)
 *  - `icon`: 버튼에 표시할 아이콘 (선택적)
 *  - `iconPosition`: 아이콘 위치, `"leading"`(왼쪽) | `"trailing"`(오른쪽). 기본값 `"leading"`
 *  - `loading`: 로딩 상태 표시. `true`일 경우 버튼 비활성화 및 스피너 표시
 *  - `disabled`: 버튼 비활성화
 *  - `onClick`: 클릭 시 실행할 함수
 *  - `ariaLabel`: 접근성을 위한 버튼 라벨
 *
 * @example
 * ```tsx
 * <KebabMenu
 *   items={[
 *     { text: "편집", icon: { name: "Edit" }, onClick: handleEdit },
 *     { text: "삭제", icon: { name: "Trash" }, onClick: handleDelete, disabled: true },
 *     { text: "복사", icon: { name: "Copy" }, loading: true },
 *   ]}
 * />
 * ```
 */

interface InputChatProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
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
        {...props}
        className={cn(
          "h-11 min-w-0 flex-1 rounded-[24px] px-4 text-body2-medium text-neutral-normal-placeholder bg-fill-neutral-strong-default hover:placeholder-black focus:text-black disabled:text-neutral-strong-disabled",
          isValue && "text-neutral-strong-focused"
        )}
        placeholder="메시지 보내기"
        {...register(name, validation)}
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
