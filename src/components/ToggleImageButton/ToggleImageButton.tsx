import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import Image from "next/image";

interface ToggleImageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  images: string[];
  ariaLabel?: string;
  toggleState: boolean;
  position?: "vertical" | "horizontal";
  gap?: number;
}

const ToggleImageButton = ({
  images,
  ariaLabel,
  toggleState,
  position = "horizontal",
  gap = 8,
  ...props
}: ToggleImageButtonProps) => {
  const imageStates = images.map((image, index) => ({
    image,
    isActive: toggleState ? index === 0 : index === 1,
    isOn: index === 0,
  }));

  return (
    <div
      className={cn("flex items-center", position === "vertical" ? "flex-col" : "flex-row")}
      style={{ gap: `${gap}px` }}
    >
      {imageStates.map(({ image, isActive, isOn }) => (
        <button
          {...props}
          key={image}
          aria-label={`${ariaLabel} - ${isOn ? "이미지 선택" : "이미지 선택되지 않음"}`}
          disabled={isActive}
          className={cn(
            "relative rounded-[6px] border-2 transition-all",
            isActive ? "cursor-not-allowed border-[#1EB87B]" : "cursor-pointer border-transparent"
          )}
        >
          <div className="relative h-[110px] w-[110px]">
            <Image
              src={image}
              width={110}
              height={110}
              alt={`${isOn ? "선택된 이미지" : "선택되지 않은 이미지"}`}
              className="glass-card h-[110px] w-[110px] rounded-[6px]"
            />
            <span
              className={cn(
                "absolute right-[6px] top-[6px] h-[20px] w-[20px] rounded-full border-[1.2px] border-[#1EB87B] text-[12px] font-[130] text-white flex-center",
                isActive ? "bg-[#1EB87B]" : "bg-white"
              )}
            >
              {isOn ? "1" : "2"}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ToggleImageButton;
