import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import Image from "next/image";

/**
 * @author hyungjun
 *
 * 두 개의 이미지를 토글하여 선택할 수 있는 버튼 그룹 컴포넌트입니다.
 * `toggleState`에 따라 첫 번째 또는 두 번째 이미지가 선택 상태로 표시됩니다.
 * 선택된 이미지는 테두리 색상과 배경으로 강조되며, 비활성화 상태로 처리됩니다.
 *
 * @param images - 토글할 이미지 URL 배열입니다. 두 개의 이미지가 필요합니다.
 *
 * @param toggleState - 현재 선택 상태를 지정합니다.
 * `true`일 경우 첫 번째 이미지가 선택되고, `false`일 경우 두 번째 이미지가 선택됩니다.
 *
 * @param position - 버튼 배열 방향을 지정합니다.
 * `"horizontal"`(가로) | `"vertical"`(세로), (기본값 `"horizontal"`)
 *
 * @param gap - 버튼 사이 간격(px)입니다. (기본값 `8`)
 *
 * @param ariaLabel - 접근성을 위한 버튼 그룹 라벨 텍스트입니다.
 *
 * @example
 * ```tsx
 * <ToggleImageButton
 *   images={["/img1.png", "/img2.png"]}
 *   toggleState={isImage1Selected}
 *   ariaLabel="프로필 이미지 선택"
 *   position="horizontal"
 *   onClick={() => setIsImage1Selected(prev => !prev)}
 * />
 * ```
 */

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
            isActive
              ? "cursor-not-allowed border-brand-normal-default"
              : "cursor-pointer border-transparent"
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
                "absolute right-[6px] top-[6px] h-[20px] w-[20px] rounded-full border-[1.2px] border-[#1EB87B] text-caption1-semibold text-white flex-center",
                isActive ? "bg-fill-flatGreen-500" : "bg-white"
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
