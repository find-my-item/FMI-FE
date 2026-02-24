import { ChangeEvent, useEffect, useRef, useState } from "react";

interface UseChangeImgProps {
  setOpenMenu: (open: boolean) => void;
  profileImg?: string;
}

const useChangeImg = ({ setOpenMenu, profileImg }: UseChangeImgProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImgUrl, setPreviewImgUrl] = useState<string | null>(profileImg ?? "");

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.target.files?.[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImgUrl(url);

      setOpenMenu(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewImgUrl) {
        URL.revokeObjectURL(previewImgUrl);
      }
    };
  }, [previewImgUrl]);

  return {
    handleChangeImg,
    handleButtonClick,
    previewImgUrl,
    setPreviewImgUrl,
    fileInputRef,
  };
};

export default useChangeImg;
