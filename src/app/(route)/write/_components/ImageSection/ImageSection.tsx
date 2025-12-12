"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components";
import { ImagePreviewList } from "../_internal";
import { useToast } from "@/context/ToastContext";

const ImageSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [imgTotalCount, setImgTotalCount] = useState(0);
  const { addToast } = useToast();

  const handleClickImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = () => {
    const files = fileInputRef.current?.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) => file.type.startsWith("image/"));
    const previewUrls = validFiles.map((file) => URL.createObjectURL(file));

    const currentCount = images.length;
    const remainCount = 5 - currentCount;

    if (remainCount <= 0 || previewUrls.length > remainCount) {
      addToast("이미지는 최대 5장만 첨부할 수 있어요.", "warning");
      return;
    }

    const willAdd = previewUrls.slice(0, remainCount);

    setImages((prev) => [...prev, ...willAdd]);
    setImgTotalCount(currentCount + willAdd.length);
  };

  return (
    <section className="flex flex-col items-start justify-center gap-4 border-b border-flatGray-50 px-5 py-6">
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        multiple
        ref={fileInputRef}
        onChange={handleImageUpload}
      />

      <div className="hide-scrollbar flex flex-nowrap items-center gap-4 overflow-x-scroll">
        <button
          type="button"
          aria-label="이미지 업로드"
          onClick={handleClickImage}
          className="size-[104px] shrink-0 rounded-[6px] bg-flatGray-25 flex-col-center"
        >
          <Icon name="Camera" size={32} />
          <span className="select-none text-caption1-regular text-flatGray-400">
            ({imgTotalCount}/5)
          </span>
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
