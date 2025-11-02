"use client";

import { TextareaHTMLAttributes, useState } from "react";
import { cn } from "@/utils/cn";
import DeleteButton from "../DeleteButton";

interface InputFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  successMessage?: string;
  errorMessage?: string;
  hasError?: boolean;
  rule?: string;
  isLengthCheck?: boolean;
  maxLength?: number;
}
const InputField = ({ isLengthCheck = false, hasError, ...props }: InputFieldProps) => {
  const [value, setValue] = useState("");

  return (
    <div className="relative flex w-full flex-col">
      <textarea
        {...props}
        className={cn(
          "disabled:background-[#E4E4E4] h-[120px] w-full resize-none rounded-[10px] border border-[#CFCFCF] p-3 hover:border-[#ADADAD] focus:border-[#ADADAD] disabled:text-[#9D9D9D]",
          hasError && "border-[#FF4242]",
          value && "border-[#ADADAD]"
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* 삭제 버튼 */}
      <DeleteButton
        isValue={!!value}
        customStyle="right-[14px] top-[14px]"
        onDelete={() => setValue("")}
      />

      {/* 안내 문구 */}
      <div className="flex w-full justify-between text-caption1-regular text-[#787878]">
        {hasError ? <p className="text-[#FF4242]">{props.errorMessage}</p> : <p>{props.rule}</p>}
        {/* 글자 수 확인 */}
        {isLengthCheck && (
          <span>
            {" "}
            {value.length}/{props.maxLength}{" "}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
