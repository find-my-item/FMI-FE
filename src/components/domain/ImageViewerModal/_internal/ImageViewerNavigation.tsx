import { Icon } from "@/components/common";

interface ImageViewerNavigationProps {
  handlePrev: () => void;
  handleNext: () => void;
  imagesLength: number;
}

const ImageViewerNavigation = ({
  handlePrev,
  handleNext,
  imagesLength,
}: ImageViewerNavigationProps) => {
  if (imagesLength <= 1) return null;

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-5 z-10 text-white"
        aria-label="이전 이미지 버튼"
      >
        <Icon name="ArrowLeftSmall" size={36} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-5 z-10 text-white"
        aria-label="다음 이미지 버튼"
      >
        <Icon name="ArrowRightSmall" size={36} />
      </button>
    </>
  );
};

export default ImageViewerNavigation;
