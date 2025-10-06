import { cn } from "@/utils/cn";
import React from "react";

interface RequiredTextProps {
  className?: string;
}

const RequiredText = ({ className }: RequiredTextProps) => {
  return <span className={cn("text-[#1EB87B]", className)}>*</span>;
};

export default RequiredText;
