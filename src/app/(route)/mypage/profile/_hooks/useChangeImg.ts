import { ChangeEvent, useEffect, useRef, useState } from "react";

interface UseChangeImgProps {
  setOpenMenu: (open: boolean) => void;
  initialImg?: string;
  onImageChange: (file: File | null) => void;
}

const useChangeImg = ({ setOpenMenu, initialImg, onImageChange }: UseChangeImgProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImgUrl, setPreviewImgUrl] = useState<string | null>(initialImg ?? "");

  const handleButtonClick = () => {
    fileInputRef.current?.click();
    setOpenMenu(false);
  };

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewImgUrl) {
        URL.revokeObjectURL(previewImgUrl);
      }

      const url = URL.createObjectURL(file);
      setPreviewImgUrl(url);

      onImageChange(file);
      setOpenMenu(false);
    }
  };

  // 이미지 삭제
  const resetImage = () => {
    setPreviewImgUrl(null);
    onImageChange(null);
    setOpenMenu(false);
  };

  return {
    handleChangeImg,
    handleButtonClick,
    previewImgUrl,
    resetImage,
    fileInputRef,
  };
};

export default useChangeImg;
