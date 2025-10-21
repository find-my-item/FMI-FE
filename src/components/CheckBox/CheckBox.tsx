"use client";

import Icon from "@/components/Icon/Icon";

interface checkProps {
  children: string;
  name: string;
  boxSize?: string;
  className?: string;
}

const CheckBox = ({ children, name, ...rest }: checkProps) => {
  return (
    <label htmlFor={name} className="flex cursor-pointer items-center">
      <input name={name} type="checkbox" className="peer sr-only" />
      <div className="relative h-6 w-6 rounded bg-[#E4E4E4] flex-center peer-checked:bg-[#1EB87B] [&_svg]:opacity-0 peer-checked:[&_svg]:opacity-100">
        <Icon
          name="Check"
          size={15}
          title="체크됨"
          className="absolute inset-0 m-auto opacity-0 peer-checked:opacity-100"
        />
      </div>
      <span className="ml-3 text-[#9D9D9D]">{children}</span>
    </label>
  );
};

export default CheckBox;
