"use client";
"use no memo";

import { TextareaHTMLAttributes } from "react";
import { cn } from "@/utils";
import { RegisterOptions, useFormContext } from "react-hook-form";
import DeleteButton from "../_internal/DeleteButton/DeleteButton";
import Label from "../_internal/Label/Label";
import Caption from "../_internal/Caption/Caption";
import Counter from "../_internal/Counter/Counter";
import { useFormInput } from "../_internal/_hooks/useFormInput";

interface InputFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  successMessage?: string;
  rule?: string;
  isLengthCheck?: boolean;
  maxLength?: number;
  validation?: RegisterOptions;
}

const InputField = ({ name, validation, ...props }: InputFieldProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const { onDelete } = useFormInput();

  const isValue = watch(name) ?? "";
  const isValueStr = (isValue ?? "").toString();

  const maxLength =
    typeof validation?.maxLength === "number" ? validation.maxLength : validation?.maxLength?.value;

  return (
    <div className="flex w-full flex-col gap-1">
      <Label
        name={name}
        label={props.label}
        className="text-body2-regular text-layout-body-default"
      />

      <div className="relative">
        <textarea
          id={name}
          {...props}
          className={cn(
            "text-body4-regular h-[120px] w-full resize-none rounded-[10px] border border-neutral-normal-default p-3 hover:border-neutral-normal-hover focus:border-neutral-normal-focused disabled:border-neutral-normal-disabled disabled:bg-fill-neutral-normal-disabled",
            !!errors[name] && "!border-system-warning",
            isValue && "focus:border-neutral-normal-focused"
          )}
          {...register(name, validation)}
        />

        {/* 삭제 버튼 */}
        <DeleteButton
          value={isValue}
          className="right-[14px] top-[14px]"
          onDelete={() => onDelete(name)}
        />
      </div>

      {/* 안내 문구 */}
      <div className="flex w-full justify-between text-caption1-regular text-layout-body-default">
        <Caption
          hasError={!!errors[name]}
          errorMessage={errors[name]?.message as string}
          rule={props.rule}
        />

        {/* 글자 수 확인 */}
        <Counter isLength={isValueStr.length} maxLength={maxLength} />
      </div>
    </div>
  );
};

export default InputField;
