import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils";
import Icon from "@/components/Icon/Icon";

interface DeleteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  eyeShow?: boolean;
  value?: string;
  className?: string;
  onDelete?: () => void;
}

const DeleteButton = ({ eyeShow, value = "", className, onDelete }: DeleteButtonProps) => {
  const isValue = !!value.trim();

  return (
    <button
      type="button"
      aria-label="입력값 전체 삭제"
      onClick={onDelete}
      className={cn(
        "absolute h-[16.67px] w-[16.67px] rounded-full bg-[#9D9D9D] outline-none flex-center",
        eyeShow ? "right-8" : "right-2",
        !isValue && "opacity-0",
        className
      )}
    >
      <Icon name="Delete" size={6.97} />
    </button>
  );
};

export default DeleteButton;
