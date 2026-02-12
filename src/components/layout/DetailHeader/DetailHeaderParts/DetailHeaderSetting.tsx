"use client";

import { Icon } from "@/components/common";
import { BaseButtonProps } from "./BaseButtonPropsType";

const Setting = ({ ariaLabel = "알림 설정", ...props }: BaseButtonProps) => {
  return (
    <button {...props} aria-label={ariaLabel}>
      <Icon name="Setting" />
    </button>
  );
};

export default Setting;
