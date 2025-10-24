import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

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
          aria-label={`${ariaLabel} - ${isOn ? "on" : "off"}`}
          disabled={isActive}
          className={cn(
            "relative rounded-[6px] border-2 transition-all",
            isActive ? "border-[#1EB87B]" : "border-transparent",
            isActive ? "cursor-not-allowed" : "cursor-pointer"
          )}
        >
          <img
            src={image}
            alt={`Toggle state ${isOn ? "on" : "off"}`}
            className="glass-card h-[110px] w-[110px] rounded-[6px]"
          />
          <div
            className={cn(
              "absolute right-[6px] top-[6px] h-[20px] w-[20px] rounded-full border-[1.2px] border-[#1EB87B] text-[12px] font-[130] text-white flex-center",
              isActive ? "bg-[#1EB87B]" : "bg-white"
            )}
          >
            {isOn ? "1" : "2"}
          </div>
        </button>
      ))}
    </div>
  );
};

export default ToggleImageButton;
