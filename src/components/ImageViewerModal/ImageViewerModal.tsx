"use client";

import { createPortal } from "react-dom";
import { useDotNavigation } from "./_hooks/useDotNavigation/useDotNavigation";
import { useModalOverflow } from "./_hooks/useModalOverflow/useModalOverflow";
import { getNextIndex, getPrevIndex } from "./_utils/imageViewer";
import useImageViewerNavigation from "@/components/ImageViewerModal/_hooks/useImageViewerNavigation/useImageViewerNavigation";
import ImageViewerHeader from "./_internal/ImageViewerHeader";
import ImageViewerNavigation from "./_internal/ImageViewerNavigation";
import ImageViewerDots from "./_internal/ImageViewerDots";
import ImageViewerMainImage from "./_internal/ImageViewerMainImage";

interface ImageViewerModalProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const ImageViewerModal = ({ images, initialIndex, isOpen, onClose }: ImageViewerModalProps) => {
  const { currentIndex, goTo, setCurrentIndex } = useDotNavigation(isOpen, initialIndex);

  useModalOverflow(isOpen);

  const handlePrev = () => setCurrentIndex((prev) => getPrevIndex(prev, images.length));
  const handleNext = () => setCurrentIndex((prev) => getNextIndex(prev, images.length));

  useImageViewerNavigation({ isOpen, onClose, handlePrev, handleNext });

  if (!isOpen) return null;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="이미지 상세 보기 모달"
      className="fixed inset-0 z-50 bg-dimOpaque"
    >
      <ImageViewerHeader currentImage={images[currentIndex]} onClose={onClose} />

      <div className="flex h-full items-center justify-center">
        <ImageViewerNavigation
          handleNext={handleNext}
          handlePrev={handlePrev}
          imagesLength={images.length}
        />

        <ImageViewerMainImage
          handlePrev={handlePrev}
          handleNext={handleNext}
          images={images}
          currentIndex={currentIndex}
        />
      </div>

      <ImageViewerDots currentIndex={currentIndex} goTo={goTo} imagesLength={images.length} />
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ImageViewerModal;
