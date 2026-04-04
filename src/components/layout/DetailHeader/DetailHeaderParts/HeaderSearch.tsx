"use client";

import { Icon } from "@/components/common";
import { BaseButtonProps } from "./BaseButtonPropsType";

// TODO(형준): 아이콘 색상 토큰 반영
const Search = ({ ariaLabel = "검색", ...props }: BaseButtonProps) => {
  return (
    <button {...props} aria-label={ariaLabel}>
      <Icon name="Search" className="text-[#242424]" />
    </button>
  );
};

export default Search;
