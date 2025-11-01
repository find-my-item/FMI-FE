"use client";

import { TextareaHTMLAttributes, useState } from "react";
import { cn } from "@/utils/cn";
import DeleteButton from "../DeleteButton";

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
      <DeleteButton
        isValue={!!value}
        customStyle="right-[14px] top-[14px]"
        onDelete={() => setValue("")}
      />

      <span>error</span>
    </div>
  );
};

export default InputField;
