"use client";

import Icon from "@/components/Icon/Icon";

interface checkProps {
  children: string;
  name: string;
}

const CheckBox = ({ children, name, ...rest }: checkProps) => {
  return (
    <label htmlFor={name} className="flex cursor-pointer items-center">
      <input name={name} type="checkbox" className="peer sr-only" />
      <div className="relative grid h-3 w-3 place-items-center rounded bg-gray-300 peer-checked:bg-[#1EB87B] [&_svg]:opacity-0 peer-checked:[&_svg]:opacity-100">
        <Icon name="Check" size={5} title="체크됨" />
      </div>
      <span className="ml-3 text-[#9D9D9D]">{children}</span>
    </label>
  );
};

export default CheckBox;
