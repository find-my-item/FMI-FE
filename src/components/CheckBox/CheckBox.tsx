"use client";

import Icon from "@/components/Icon/Icon";
import { useState } from "react";
import { cn } from "@/utils/cn";

interface checkProps {
  name: string;
  boxSize?: string;
}

const CheckBox = ({ name, boxSize, ...rest }: checkProps) => {
  const [checked, setChecked] = useState(false); // 체크 상태 관리

  return (
    <label htmlFor={name} className="flex cursor-pointer items-center">
      <input
        id={name}
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <div
        className={cn(
          "relative h-6 w-6 rounded bg-[#E4E4E4] flex-center peer-checked:bg-[#1EB87B] peer-checked:opacity-70 [&_svg]:opacity-0 peer-checked:[&_svg]:opacity-100",
          boxSize
        )}
      >
        <Icon
          name="Check"
          title="체크됨"
          className="absolute inset-0 m-auto h-2 peer-checked:opacity-100"
        />
      </div>
      <span className="ml-3 text-[#9D9D9D]">{name}</span>
    </label>
  );
};

export default CheckBox;
