"use client";

import { useState, useEffect, MouseEvent } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils";
import Image from "next/image";
import { Icon } from "@/components";

interface ImageViewerModalProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const ImageViewerModal = ({ images, initialIndex, isOpen, onClose }: ImageViewerModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex]);
  if (!isOpen) return null;
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleDownload = (e: MouseEvent<HTMLButtonElement>, blobUrl: string) => {
    e.stopPropagation();
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "image.png";
    a.click();
  };

  const navButtonStyle =
    "h-[40px] rounded-[10px] bg-fill-neutralInversed-strong-default flex-center";

  const modalContent = (
    <div className="fixed inset-0 z-50 bg-dimOpaque">
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-[16px] py-[4px]">
        <button
          onClick={onClose}
          className={cn(navButtonStyle, "w-[40px]")}
          aria-label="이미지 상세 보기 닫기"
        >
          <Icon name="ArrowLeftSmall" size={18} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-body2-semibold text-neutralInversed-strong-default">나</span>
          <span className="text-caption1-medium text-layout-body-default">
            2025.11.08.토요일 10:13
          </span>
        </div>
        <button
          className={cn(navButtonStyle, "w-[46px]")}
          aria-label="이미지 다운로드"
          onClick={(e) => handleDownload(e, images[currentIndex])}
        >
          <Icon name="Download" size={18} />
        </button>
      </div>

      <div className="flex h-full items-center justify-center">
        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-5 z-10 text-white"
            aria-label="이전 이미지"
          >
            <Icon name="ArrowLeftSmall" size={36} />
          </button>
        )}

        <div className="relative h-[80vh] w-full" onClick={(e) => e.stopPropagation()}>
          <Image
            src={images[currentIndex]}
            alt={`이미지 ${currentIndex + 1}`}
            fill
            className="object-contain"
            priority
          />
        </div>

        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-5 z-10 text-white"
            aria-label="다음 이미지"
          >
            <Icon name="ArrowRightSmall" size={36} />
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-[160px] left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleDotClick(index);
              }}
              className={cn(
                "h-[6px] w-[6px] rounded-full bg-white",
                currentIndex === index ? "bg-opacity-100" : "bg-opacity-50"
              )}
              aria-label={`${index + 1}번째 이미지로 이동`}
              aria-current={currentIndex === index ? "true" : "false"}
            />
          ))}
        </div>
      )}
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ImageViewerModal;
