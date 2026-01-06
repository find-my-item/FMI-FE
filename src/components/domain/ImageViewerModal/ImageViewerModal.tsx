"use client";

import { createPortal } from "react-dom";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import ImageViewerHeader from "./_internal/ImageViewerHeader";
import ImageViewerNavigation from "./_internal/ImageViewerNavigation";
import useImageViewerNavigation from "./_hooks/useImageViewerNavigation";

import "swiper/css";
import "swiper/css/pagination";
import "./_internal/swiper-pagination.css";

interface ImageViewerModalProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const ImageViewerModal = ({ images, initialIndex, isOpen, onClose }: ImageViewerModalProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const handleNext = () => swiperRef.current?.slideNext();
  const handlePrev = () => swiperRef.current?.slidePrev();

  useImageViewerNavigation({ isOpen, onClose, handlePrev, handleNext });

  if (!isOpen) return null;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="이미지 상세 보기 모달"
      className="fixed inset-0 z-50 bg-dimOpaque"
    >
      <ImageViewerHeader
        swiperRef={swiperRef}
        images={images}
        initialIndex={initialIndex}
        onClose={onClose}
      />

      <div className="flex h-full items-center justify-center">
        <ImageViewerNavigation
          handleNext={handleNext}
          handlePrev={handlePrev}
          imagesLength={images.length}
        />

        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          loop
          initialSlide={initialIndex}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="h-[80vh] w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full select-none">
                <Image
                  src={image}
                  alt={`상세 이미지 ${index + 1}`}
                  fill
                  className="select-none object-contain"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ImageViewerModal;
