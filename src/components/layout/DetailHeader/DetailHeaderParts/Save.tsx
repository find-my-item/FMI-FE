"use client";

import { BaseButtonProps } from "./BaseButtonPropsType";

const Save = ({ ariaLabel = "게시글 저장", ...props }: BaseButtonProps) => {
  const isDisabledStyle = props.disabled ? "text-flatGreen-200" : "text-flatGreen-500";
  return (
    <button {...props} className={isDisabledStyle} aria-label={ariaLabel}>
      임시 저장
    </button>
  );
};

export default Save;
