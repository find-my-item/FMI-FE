"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils";
import Image from "next/image";
import Icon from "@/components/Icon/Icon";
import { handleClick } from "./_utils/handleClick";
import { getImageButtonState } from "./_utils/getImageButtonState";
import { useChatRoom } from "@/app/(route)/chat/[roomId]/_components/ChatRoomProvider/ChatRoomProvider";
import { handleFileChange } from "@/components/Input/InputChat/utils/handleFileChange";
import { useObjectURLs } from "@/hooks";

/**
 * @author hyungjun
 *
 * 여러 이미지를 선택/비선택할 수 있는 버튼 그룹 컴포넌트입니다.
 * 각 이미지 버튼을 클릭하면 선택 상태가 토글되며,
 * 선택된 버튼에는 이미지 순서 번호가 표시됩니다.
 * 최대 선택 수 제한이나 외부 상태 관리 없이 내부 상태로 처리됩니다.
 *
 * @param images - 표시할 이미지 URL 배열입니다.
 * 각 버튼은 배열 순서대로 렌더링되며, 클릭 시 선택 상태가 토글됩니다.
 *
 * @param gap - 버튼 간 간격(px)입니다. 기본값 `8`
 *
 * @param ariaLabel - 접근성을 위한 버튼 그룹 라벨 텍스트입니다.
 *
 * @example
 * ```tsx
 * <ToggleImageButton
 *   images={["/img1.png", "/img2.png", "/img3.png"]} (File타입)
 *   position="horizontal"
 *   gap={8}
 *   ariaLabel="프로필 이미지 선택"
 * />
 * ```
 */

interface ToggleImageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
  gap?: number;
}

const ToggleImageButton = ({ ariaLabel, gap = 8 }: ToggleImageButtonProps) => {
  const { images, setImages, selectedImages, setSelectedImages } = useChatRoom();
  const urls = useObjectURLs(images);
  const isDisabled = images.length >= 5;

  return (
    <div
      className="flex select-none flex-wrap"
      style={{ gap: `${gap}px` }}
      aria-label={ariaLabel}
      role="group"
    >
      <label
        htmlFor="ImageAttach"
        className={cn(
          "h-[100px] w-[100px] rounded-[9.62px] bg-fill-neutral-strong-default flex-center",
          isDisabled && "pointer-events-none"
        )}
        aria-label="이미지 첨부"
        role="button"
        aria-disabled={isDisabled}
      >
        <Icon name="Image" size={26} />
      </label>
      <input
        id="ImageAttach"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        disabled={isDisabled}
        onChange={(e) => handleFileChange(e, images, setImages)}
      />

      {urls.map((src, index) => {
        const { isActive, order } = getImageButtonState(index, selectedImages);

        return (
          <button
            key={index}
            onClick={() => handleClick(index, setSelectedImages)}
            className={cn(
              "relative rounded-[6px] border-2 transition-all duration-75",
              isActive ? "border-brand-normal-default" : "border-transparent"
            )}
          >
            <div className="relative h-[100px] w-[100px]">
              {urls[index] && (
                <Image
                  src={src}
                  width={100}
                  height={100}
                  alt={`${index + 1}번째 가져온 이미지`}
                  className="glass-card h-[100px] w-[100px] rounded-[6px] object-cover"
                />
              )}

              <span
                className={cn(
                  "absolute right-[6px] top-[6px] h-[20px] w-[20px] rounded-full border-[1.2px] text-caption1-semibold flex-center",
                  isActive
                    ? "border-[#1EB87B] text-white bg-fill-flatGreen-500"
                    : "text-fill-flatGreen-500 border-[#DFDFDF] bg-white"
                )}
              >
                {order}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ToggleImageButton;
