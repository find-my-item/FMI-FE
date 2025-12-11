"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components";
import { ImagePreviewList } from "../_internal";

const ImageSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [imgTotalCount, setImgTotalCount] = useState(0);

  const handleSelectImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = () => {
    const files = fileInputRef.current?.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) => file.type.startsWith("image/"));

    const previewUrls = validFiles.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...previewUrls]);
    setImgTotalCount((prev) => prev + previewUrls.length);
  };

  return (
    <section className="flex flex-col items-start justify-center gap-4 border-b border-flatGray-50 px-5 py-6">
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageUpload}
      />

      <div className="hide-scrollbar flex flex-nowrap items-center gap-4 overflow-x-scroll">
        <button
          type="button"
          aria-label="이미지 업로드"
          onClick={handleSelectImage}
          className="size-[104px] shrink-0 cursor-pointer rounded-[6px] bg-flatGray-25 flex-col-center"
        >
          <Icon name="Camera" size={32} />
          <span className="text-caption1-regular text-flatGray-400">({imgTotalCount}/5)</span>
        </button>
        <ImagePreviewList
          images={images}
          setImages={setImages}
          setImgTotalCount={setImgTotalCount}
        />
      </div>

      <span className="text-caption1-regular text-neutral-normal-placeholder">
        최대 10MB, 총 5장의 이미지를 첨부할 수 있습니다. (jpg, jpeg, png)
      </span>
    </section>
  );
};

export default ImageSection;
