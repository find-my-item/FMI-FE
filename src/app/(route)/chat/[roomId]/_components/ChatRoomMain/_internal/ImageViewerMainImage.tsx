"use client";

import Image from "next/image";
import useDragSwipe from "../hooks/useDragSwipe/useDragSwipe";

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
      className="relative h-[80vh] w-full cursor-grab select-none"
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
