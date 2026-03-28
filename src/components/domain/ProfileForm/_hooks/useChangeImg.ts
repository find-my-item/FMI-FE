import { ChangeEvent, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

interface UseChangeImgProps {
  setOpenKebabMenu: (open: boolean) => void;
  initialImg?: string;
  onImageChange: (file: File | null) => void;
}

export const useChangeImg = ({
  setOpenKebabMenu,
  initialImg,
  onImageChange,
}: UseChangeImgProps) => {
  const { setValue } = useFormContext();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImgUrl, setPreviewImgUrl] = useState<string | null>(initialImg ?? "");

  const handleButtonClick = () => {
    fileInputRef.current?.click();
    setOpenKebabMenu(false);
  };

  // 이미지 변경
  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewImgUrl) {
        URL.revokeObjectURL(previewImgUrl);
      }

      const url = URL.createObjectURL(file);
      setPreviewImgUrl(url);

      onImageChange(file);
      setOpenKebabMenu(false);
    }
  };

  // 이미지 삭제
  const handleDeleteImage = () => {
    setValue("profileImg", null);

    setPreviewImgUrl(null);
    onImageChange(null);
    setOpenKebabMenu(false);
  };

  return {
    handleChangeImg,
    handleButtonClick,
    previewImgUrl,
    handleDeleteImage,
    fileInputRef,
  };
};
