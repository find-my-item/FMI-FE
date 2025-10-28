"use client";

import { InputHTMLAttributes } from "react";
import Icon from "../../Icon/Icon";
import { useState } from "react";
import { cn } from "@/utils/cn";
import DeleteButton from "../DeleteButton";

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputSearch = ({ ...props }: InputSearchProps) => {
  const [value, setValue] = useState("");

  return (
    <div className="relative flex w-full flex-row gap-2">
      <Icon name="Search" size={16} className="absolute left-5 top-1/2 -translate-y-1/2" />

      <input
        {...props}
        className="h-11 min-w-0 flex-1 rounded-[24px] bg-[#F5F5F5] px-10 text-[14px] text-[#9D9D9D] focus:text-[#000000] disabled:text-[#9D9D9D]"
        placeholder="검색어 키워드를 입력해 주세요."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {/* 삭제 버튼 */}
      <DeleteButton
        isValue={value}
        customStyle="top-1/2 -translate-y-1/2 right-5"
        onDelete={() => setValue("")}
      />
    </div>
  );
};

export default InputSearch;
