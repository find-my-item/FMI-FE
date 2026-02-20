import { ChangeEvent, useEffect, useRef, useState } from "react";

const useChangeImage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.target.files?.[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImageUrl(url);
      console.log("이미지>> ", previewImageUrl);
      // setOpenMenu(false);

      // setValue("prefileImg", file);
    }
  };

  useEffect(() => {
    return () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);
};

export default useChangeImage;
