import { cn } from "@/utils";

interface ImageViewerDotsProps {
  currentIndex: number;
  goTo: (index: number) => void;
  imagesLength: number;
}

const ImageViewerDots = ({ currentIndex, goTo, imagesLength }: ImageViewerDotsProps) => {
  if (imagesLength <= 1) return null;

  return (
    <nav className="absolute bottom-[160px] left-0 right-0 flex justify-center gap-2">
      {Array.from({ length: imagesLength }).map((_, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            goTo(index);
          }}
          className={cn(
            "h-[6px] w-[6px] rounded-full bg-white",
            currentIndex === index ? "bg-opacity-100" : "bg-opacity-50"
          )}
          aria-label={`${index + 1}번째 이미지로 이동 버튼`}
          aria-current={currentIndex === index ? "true" : "false"}
        />
      ))}
    </nav>
  );
};

export default ImageViewerDots;
