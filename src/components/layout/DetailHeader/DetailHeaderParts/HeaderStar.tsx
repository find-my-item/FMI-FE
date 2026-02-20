"use client";

import { Bookmark } from "@/components/common";
import { BaseButtonProps } from "./BaseButtonPropsType";

const Star = (
  props: BaseButtonProps & { isActive: boolean; size?: "large" | "medium" | "small" }
) => {
  return <Bookmark {...props} />;
};

export default Star;
