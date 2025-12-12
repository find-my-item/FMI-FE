"use client";

import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Icon } from "@/components";

interface ImagePreviewListProps {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
  setImgTotalCount: Dispatch<SetStateAction<number>>;
}

const ImagePreviewList = ({ images, setImages, setImgTotalCount }: ImagePreviewListProps) => {
  return (
    <>
      {images.map((image, index) => (
        <div key={index} className="relative shrink-0">
          <Image
            src={image}
            alt=""
            width={104}
            height={104}
            quality={100}
            draggable={false}
            className="size-[104px] select-none rounded-[10px] object-contain"
          />
          <button
            type="button"
            aria-label="이미지 삭제"
            onClick={() => {
              setImages((prev) => prev.filter((_, idx) => idx !== index));
              setImgTotalCount((prev) => prev - 1);
            }}
            className="absolute right-1.5 top-1.5 rounded-full border border-divider-default bg-[#5D5D5D] p-[5px]"
          >
            <Icon name="Delete" size={10} />
          </button>
        </div>
      ))}
    </>
  );
};

export default ImagePreviewList;
