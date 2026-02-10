"use client";

import { useObjectURLs } from "@/hooks";
import Image from "next/image";
import { Icon } from "@/components/common";
import useHorizontalDragScroll from "./useHorizontalDragScroll";

interface InputCommentImageSectionProps {
  images: File[];
  setImages: (images: File[]) => void;
}

const InputCommentImageSection = ({ images, setImages }: InputCommentImageSectionProps) => {
  const urls = useObjectURLs(images);
  const { ref: scrollRef, onMouseDown } = useHorizontalDragScroll();

  return (
    <div
      ref={scrollRef}
      onMouseDown={onMouseDown}
      role="region"
      aria-label="댓글 이미지 목록"
      className="mb-4 flex h-[90px] w-full select-none gap-5 overflow-x-auto bg-white pl-5 pt-[10px] no-scrollbar"
    >
      {urls.map((url, index) => (
        <div key={url} className="relative h-[80px] w-[80px] shrink-0 rounded-[16px]">
          <Image
            src={url}
            alt="image"
            className="h-[80px] w-[80px] rounded-[16px] object-cover"
            width={80}
            height={80}
          />
          <button
            type="button"
            aria-label="댓글 이미지 삭제"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => {
              setImages(images.filter((_, i) => i !== index));
            }}
            className="absolute right-[2.67px] top-[2.67px] h-[17.78px] w-[17.78px] rounded-full border-[1.07px] border-divider-default bg-flatGray-600 flex-center"
          >
            <Icon name="CommentImageClear" size={7.43} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default InputCommentImageSection;
