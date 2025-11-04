"use client";

import { InputHTMLAttributes } from "react";
import Icon from "../../Icon/Icon";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import DeleteButton from "../_internal/DeleteButton/DeleteButton";

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
}

interface RfhMode {
  mode: "RFH";
  register: UseFormRegisterReturn;
}

const InputSearch = ({ ...props }: InputSearchProps) => {
  const [value, setValue] = useState("");

  return (
    <div className="relative flex w-full flex-row gap-2">
      <Icon name="Search" size={16} className="absolute left-5 top-1/2 -translate-y-1/2" />

      <input
        {...props}
        className="h-11 min-w-0 flex-1 rounded-[24px] border px-10 text-body1-regular text-neutral-normal-placeholder bg-fill-neutral-subtle-default hover:text-neutral-normal-hover focus:border-black focus:text-neutral-normal-focused"
        placeholder="검색어 키워드를 입력해 주세요."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* 삭제 버튼 */}
      <DeleteButton
        value={value}
        className="right-5 top-1/2 -translate-y-1/2"
        onDelete={() => setValue("")}
      />
    </div>
  );
};

export default InputSearch;
