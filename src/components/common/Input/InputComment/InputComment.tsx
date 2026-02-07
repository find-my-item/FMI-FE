import { useComposeInput } from "@/providers/ComposeInputProvider";
import { ChangeEvent, TextareaHTMLAttributes, useRef } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import Icon from "../../Icon/Icon";
import { autoResizeTextarea, mergeImageFile, submitFormOnEnter } from "@/utils";
import { cn } from "@/utils";
import InputCommentImageSection from "./_internal/InputCommentImageSection";

/**
 * InputComment 컴포넌트에 전달하는 props입니다.
 */
interface InputCommentProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** react-hook-form 필드 이름 (register/Controller용) */
  name: string;
  /** react-hook-form 유효성 검사 옵션 */
  validation?: RegisterOptions;
  /** 이미지 첨부, 입력창, 전송 버튼 일괄 비활성화 */
  disabled?: boolean;
}

/**
 * @author hyungjun
 *
 * 댓글 입력용 공통 컴포넌트입니다.
 * 이미지 첨부, 자동 높이 조절 textarea, Enter 전송을 지원합니다.
 *
 * @remarks
 * 상위에 `FormProvider`가 있어야 하며, form의 `method`는 `onChange` 모드 권장.
 *
 * @example
 * ```tsx
 * <FormProvider {...methods}>
 *   <form onSubmit={methods.handleSubmit(onSubmit)}>
 *     <InputComment name="content" validation={{ required: true }} />
 *   </form>
 * </FormProvider>
 * ```
 *
 * @param props - InputCommentProps (name 필수, validation·disabled 선택)
 */
const InputComment = ({ name, validation, disabled, ...props }: InputCommentProps) => {
  const { control } = useFormContext();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { images, setImages } = useComposeInput();

  return (
    <>
      {images?.length !== 0 && <InputCommentImageSection />}
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
              onChange={(e) => mergeImageFile(e, images, setImages)}
            />

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
                autoResizeTextarea(e.target);
              }}
              onKeyDown={(e) => submitFormOnEnter(e, textareaRef)}
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
