"use client";

import { TextareaHTMLAttributes, useState } from "react";
import { cn } from "@/utils/cn";
import Icon from "../Icon/Icon";

interface InputFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const InputField = ({ ...props }: InputFieldProps) => {
  const [value, setValue] = useState("");

  return (
    <div className="relative flex w-full flex-col">
      <textarea
        {...props}
        className={cn(
          "disabled:background-[#E4E4E4] h-[120px] w-full resize-none rounded-[10px] border border-[#CFCFCF] hover:border-[#ADADAD] focus:border-[#ADADAD] disabled:text-[#9D9D9D]",
          value && "border-[#ADADAD]"
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* 삭제 버튼 */}
      <button
        className={cn(
          "absolute right-[14px] top-[14px] h-[16.67px] w-[16.67px] rounded-full bg-[#9D9D9D] outline-none flex-center"
        )}
        type="button"
      >
        <Icon name="Delete" aria-label="입력값 지우기" size={6.97} />
      </button>

      <span>error</span>
    </div>
  );
};

export default InputField;
