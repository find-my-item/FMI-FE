"use client";

import Icon from "@/components/Icon/Icon";
import { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface CheckBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "id"> {
  id: string;
  label: string;
  boxSize?: string;
  textStyle?: string;
  state?: boolean;
}

const CheckBox = ({ id, label, boxSize, textStyle, state, ...rest }: CheckBoxProps) => {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center">
      <input id={id} type="checkbox" className="peer sr-only" {...rest} />
      <div
        className={cn(
          "relative h-6 w-6 rounded bg-[#E4E4E4] flex-center peer-checked:bg-[#1EB87B] peer-checked:opacity-70 [&_svg]:opacity-0 peer-checked:[&_svg]:opacity-100",
          boxSize
        )}
      >
        <Icon
          name="Check"
          title={state ? "체크됨" : "체크안됨"}
          className="absolute inset-0 m-auto h-2 peer-checked:opacity-100"
        />
      </div>
      <span className={cn("ml-3 text-[#5D5D5D]", textStyle)}>{label}</span>
    </label>
  );
};

export default CheckBox;
