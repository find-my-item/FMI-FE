"use client";

import { Dispatch, SetStateAction, useRef } from "react";
import Image from "next/image";
import { Icon } from "@/components";
import { cn } from "@/utils";

interface ImagePreviewListProps {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
  setImgTotalCount: Dispatch<SetStateAction<number>>;
}

const ImagePreviewList = ({ images, setImages, setImgTotalCount }: ImagePreviewListProps) => {
  const dragFromIndexRef = useRef<number | null>(null);

  const reorderImages = (from: number, to: number) => {
    if (from === to) return;

    setImages((prev) => {
      if (from < 0 || to < 0 || from >= prev.length || to >= prev.length) return prev;

      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  return (
    <div role="list" aria-label="이미지 미리보기 목록" className="flex gap-2">
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            "relative shrink-0",
            "cursor-grab active:cursor-grabbing",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          )}
          role="listitem"
          aria-label={`이미지 ${index + 1} 드래그로 순서 변경`}
          tabIndex={0}
          draggable
          onDragStart={(e) => {
            dragFromIndexRef.current = index;
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", String(index));
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
          }}
          onDrop={(e) => {
            e.preventDefault();
            const from = dragFromIndexRef.current ?? Number(e.dataTransfer.getData("text/plain"));
            const to = index;
            if (Number.isNaN(from)) return;
            reorderImages(from, to);
            dragFromIndexRef.current = null;
          }}
          onDragEnd={() => {
            dragFromIndexRef.current = null;
          }}
        >
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
            // TODO(지권): 디자인 토큰 이슈 해결 후 변경
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
    </div>
  );
};

export default ImagePreviewList;
