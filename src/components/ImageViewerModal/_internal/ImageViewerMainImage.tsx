"use client";

import Image from "next/image";
import useDragSwipe from "../_hooks/useDragSwipe/useDragSwipe";
import { cn } from "@/utils";

interface ImageViewerMainImageProps {
  handlePrev: () => void;
  handleNext: () => void;
  images: string[];
  currentIndex: number;
}

const ImageViewerMainImage = ({
  handlePrev,
  handleNext,
  images,
  currentIndex,
}: ImageViewerMainImageProps) => {
  const { handleDragStart, handleDragMove, handleDragEnd } = useDragSwipe({
    onPrev: handlePrev,
    onNext: handleNext,
  });

  return (
    <section
      className={cn(
        "relative h-[80vh] w-full select-none",
        images.length === 1 ? "cursor-default" : "cursor-grab"
      )}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      <Image
        src={images[currentIndex]}
        alt={`상세 이미지 ${currentIndex + 1}`}
        fill
        className="select-none object-contain"
        priority
        onDragStart={(e) => e.preventDefault()}
      />
    </section>
  );
};

export default ImageViewerMainImage;
