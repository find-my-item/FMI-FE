"use client";

import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Icon } from "@/components";
import { cn } from "@/utils";

interface ImagePreviewListProps {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
  setImgTotalCount: Dispatch<SetStateAction<number>>;
}

const ImagePreviewList = ({ images, setImages, setImgTotalCount }: ImagePreviewListProps) => {
  return (
    <>
      {images.map((image, index) => (
        <div key={index} className={cn("relative shrink-0")}>
          <Image
            src={image}
            alt=""
            width={104}
            height={104}
            quality={100}
            draggable={false}
            className="size-[104px] select-none rounded-[10px] object-contain"
          />
          {index === 0 && (
            <span className="absolute left-0 top-0 rounded-tl-[10px] bg-[#1EB87B] pb-[3px] pl-[9px] pr-2 pt-[5px] text-caption1-semibold text-white">
              대표
            </span>
          )}
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
