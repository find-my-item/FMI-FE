"use client";

import { BaseButtonProps } from "./BaseButtonPropsType";

const Post = ({ ariaLabel = "게시글 저장", ...props }: BaseButtonProps) => {
  const isDisabledStyle = props.disabled
    ? "text-neutralInversed-strong-default text-h2-medium"
    : "text-brand-strongUseThis-default text-h2-bold";

  return (
    <button {...props} className={isDisabledStyle} aria-label={ariaLabel}>
      등록
    </button>
  );
};

export default Post;
