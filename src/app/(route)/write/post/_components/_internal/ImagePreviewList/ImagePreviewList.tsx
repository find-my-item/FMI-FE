"use client";

import { useRef, type DragEvent } from "react";
import Image from "next/image";
import { Icon } from "@/components/common";
import { cn } from "@/utils";

interface ImagePreviewListProps {
  images: { id: string; previewUrl: string }[];
  onRemove: (index: number) => void;
  onMove: (from: number, to: number) => void;
}

const ImagePreviewList = ({ images, onRemove, onMove }: ImagePreviewListProps) => {
  const dragFromIndexRef = useRef<number | null>(null);

  const reorderImages = (from: number, to: number) => {
    if (from === to) return;
    if (from < 0 || to < 0 || from >= images.length || to >= images.length) return;
    onMove(from, to);
  };

  const handleImageDrop = (e: DragEvent<HTMLDivElement>, to: number) => {
    e.preventDefault();

    const from = dragFromIndexRef.current ?? Number(e.dataTransfer.getData("text/plain"));
    if (Number.isNaN(from)) return;

    reorderImages(from, to);
    dragFromIndexRef.current = null;
  };

  return (
    <div role="list" aria-label="이미지 미리보기 목록" className="flex gap-2">
      {images.map((image, index) => (
        <div
          key={image.id}
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
          onDrop={(e) => handleImageDrop(e, index)}
          onDragEnd={() => {
            dragFromIndexRef.current = null;
          }}
        >
          <Image
            src={image.previewUrl}
            alt=""
            width={104}
            height={104}
            quality={100}
            draggable={false}
            className="size-[104px] select-none rounded-[10px] object-cover"
          />
          {index === 0 && (
            <span
              className={cn(
                "absolute left-0 top-0 rounded-tl-[10px] pb-[3px] pl-[9px] pr-2 pt-[5px]",
                "bg-flatGreen-500 text-caption1-semibold text-white"
              )}
            >
              대표
            </span>
          )}
          <button
            type="button"
            aria-label="이미지 삭제"
            onClick={() => onRemove(index)}
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
