import React from "react";

interface ChipProps {
  label: string;
}

const Chip = ({ label }: ChipProps) => {
  return (
    <span className="rounded-full bg-[#F5F5F5] px-4 py-[6px] text-[14px] font-semibold">
      {label}
    </span>
  );
};

export default Chip;
