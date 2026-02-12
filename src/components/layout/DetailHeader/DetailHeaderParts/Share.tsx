"use client";

import { Icon } from "@/components/common";
import { BaseButtonProps } from "./BaseButtonPropsType";

const Share = ({ ariaLabel = "공유", ...props }: BaseButtonProps) => {
  return (
    <button {...props} aria-label={ariaLabel}>
      <Icon name="Share" />
    </button>
  );
};

export default Share;
