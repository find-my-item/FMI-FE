import { InputHTMLAttributes, useState } from "react";
import Icon from "../Icon/Icon";
import { cn } from "@/utils/cn";

interface DeleteButtonProps {
  eyeShow?: boolean;
  isValue?: string;
  customStyle?: string;
  onDelete: () => void;
}

const DeleteButton = ({ eyeShow, isValue, customStyle, onDelete }: DeleteButtonProps) => {
  return (
    <button
      className={cn(
        "absolute h-[16.67px] w-[16.67px] rounded-full bg-[#9D9D9D] outline-none flex-center",
        eyeShow ? "right-8" : "right-2",
        !isValue && "opacity-0",
        customStyle
      )}
      type="button"
      onClick={onDelete}
    >
      <Icon name="Delete" aria-label="입력값 지우기" size={6.97} />
    </button>
  );
};

export default DeleteButton;
