"use client";

import { InputHTMLAttributes } from "react";
import Icon from "../../Icon/Icon";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import DeleteButton from "../_internal/DeleteButton/DeleteButton";

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  className?: string;
  mode: "RHF" | "onChange";
  // onEnter?: (value: string) => void;
}

const InputSearch = ({ name, mode, label, ...props }: InputSearchProps) => {
  const { register, watch, setValue } = useFormContext();
  const rhfValue = watch(name) || "";

  const [innerValue, setInnerValue] = useState("");

  const value = mode === "onChange" ? innerValue : undefined;
  const onChange =
    mode === "onChange"
      ? props.onChange
      : (e: React.ChangeEvent<HTMLInputElement>) => setInnerValue(e.target.value);

  const onChangeDelete = () => {
    mode === "RHF" ? setValue(name, "") : setInnerValue("");
  };

  return (
    <div className="relative flex w-full flex-row gap-2">
      <Icon name="Search" size={16} className="absolute left-5 top-1/2 -translate-y-1/2" />

      <input
        {...(mode === "RHF" ? register(name) : {})}
        {...props}
        className="h-11 min-w-0 flex-1 rounded-[24px] border px-10 text-body1-regular text-neutral-normal-placeholder bg-fill-neutral-subtle-default hover:text-neutral-normal-hover focus:border-black focus:text-neutral-normal-focused"
        value={value}
        onChange={onChange}
      />

      {/* 삭제 버튼 */}
      <DeleteButton
        value={mode === "RHF" ? rhfValue : innerValue}
        className="right-5 top-1/2 -translate-y-1/2"
        onDelete={onChangeDelete}
      />
    </div>
  );
};

export default InputSearch;
