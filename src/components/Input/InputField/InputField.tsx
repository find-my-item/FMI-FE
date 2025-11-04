"use client";

import { TextareaHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { RegisterOptions, useFormContext } from "react-hook-form";
import DeleteButton from "../_internal/DeleteButton/DeleteButton";
import Label from "../_internal/Label/Label";
import Caption from "../_internal/Caption/Caption";

interface InputFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  successMessage?: string;
  errorMessage?: string;
  hasError?: boolean;
  rule?: string;
  isLengthCheck?: boolean;
  maxLength?: number;
  validation?: RegisterOptions;
}

const InputField = ({
  name,
  isLengthCheck = false,
  hasError,
  validation,
  ...props
}: InputFieldProps) => {
  const { register, watch, setValue } = useFormContext();

  const isValue = watch(name) ?? "";
  const isValueStr = (isValue ?? "").toString();

  return (
    <div className="flex w-full flex-col gap-1">
      <Label
        name={name}
        label={props.label}
        className="text-body2-regular text-layout-body-default"
      />

      <div className="relative">
        <textarea
          {...props}
          className={cn(
            "disabled:background-[#E4E4E4] h-[120px] w-full resize-none rounded-[10px] border border-[#CFCFCF] p-3 hover:border-[#ADADAD] focus:border-[#ADADAD] disabled:text-[#9D9D9D]",
            hasError && "border-system-warning",
            isValue && "border-[#ADADAD]"
          )}
          {...register(name, validation)}
        />

        {/* 삭제 버튼 */}
        <DeleteButton
          value={isValue}
          className="right-[14px] top-[14px]"
          onDelete={() => setValue(name, "")}
        />
      </div>

      {/* 안내 문구 */}
      <div className="flex w-full justify-between text-caption1-regular text-layout-body-default">
        <Caption hasError={hasError} errorMessage={props.errorMessage} rule={props.rule} />

        {/* 글자 수 확인 */}
        {isLengthCheck && (
          <span>
            {isValueStr.length}/{props.maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
