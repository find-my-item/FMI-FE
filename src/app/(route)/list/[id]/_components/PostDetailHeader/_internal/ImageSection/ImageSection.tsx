"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ImageViewerModal } from "@/components/domain";

import "swiper/css";
import "swiper/css/pagination";
import "./swiper-pagination.css";

interface ImageSectionProps {
  imageUrls: string[];
}

const ImageSection = ({ imageUrls }: ImageSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isDraggingRef = useRef(false);

  const handleOpenIfTap = () => {
    if (isDraggingRef.current) return;
    setIsOpen(true);
  };

  return (
    <>
      <div className="relative cursor-pointer select-none">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          onTouchMove={() => {
            isDraggingRef.current = true;
          }}
          onTouchEnd={() => {
            window.setTimeout(() => {
              isDraggingRef.current = false;
            }, 0);
          }}
          onSliderMove={() => {
            isDraggingRef.current = true;
          }}
          onClick={handleOpenIfTap}
        >
          {imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <Image
                src={url}
                alt={`게시글 이미지 ${index + 1}`}
                width={390}
                height={260}
                draggable={false}
                priority
                className="h-[260px] w-[390px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <ImageViewerModal
        images={imageUrls}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialIndex={0}
      />
    </>
  );
};

export default ImageSection;
