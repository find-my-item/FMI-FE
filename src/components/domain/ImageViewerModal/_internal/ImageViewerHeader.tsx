import { Icon } from "@/components/common";
import { cn } from "@/utils";
import { downloadImage } from "../_utils/imageViewer";

interface ImageViewerHeaderProps {
  onClose: () => void;
  getCurrentImage: () => string;
}

const NAV_BUTTON_STYLE =
  "h-[40px] rounded-[10px] bg-fill-neutralInversed-strong-default flex-center";

const ImageViewerHeader = ({ onClose, getCurrentImage }: ImageViewerHeaderProps) => {
  return (
    <header className="absolute left-0 right-0 top-0 flex items-center justify-between px-[16px] py-[4px]">
      <button
        onClick={onClose}
        className={cn(NAV_BUTTON_STYLE, "w-[40px]")}
        aria-label="이미지 상세 보기 닫기"
      >
        <Icon name="ArrowLeftSmall" size={18} />
      </button>
      <div className="flex flex-col items-center">
        <span className="text-body2-semibold text-neutralInversed-strong-default">나</span>
        <time className="text-caption1-medium text-layout-body-default">
          2025.11.08.토요일 10:13
        </time>
      </div>
      <button
        className={cn(NAV_BUTTON_STYLE, "w-[46px]")}
        aria-label="이미지 다운로드"
        onClick={(e) => {
          e.stopPropagation();
          downloadImage(getCurrentImage());
        }}
      >
        <Icon name="Download" size={18} />
      </button>
    </header>
  );
};

export default ImageViewerHeader;
