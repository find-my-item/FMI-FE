"use client";

import { useState } from "react";
import { cn } from "@/utils";
import { getImageLayout } from "@/utils/getImageLayout/getImageLayout";
import Image from "next/image";
import dynamic from "next/dynamic";
const ImageViewerModal = dynamic(() => import("./ImageViewerModal"), { ssr: false });

const ChatImageBox = ({ images, bubbleOrder }: { images: string[]; bubbleOrder: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const imageLayout = getImageLayout(images);
  const imageCount = images?.length || 0;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      {images && images.length > 0 && (
        <>
          {imageCount === 5 ? (
            <div className={cn(bubbleOrder, "flex flex-col gap-2")}>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleImageClick(0)}
                  className="block overflow-hidden rounded-lg"
                >
                  <Image
                    src={imageLayout[0].src}
                    width={148}
                    height={96}
                    alt="채팅 이미지 1"
                    className="h-[96px] w-[148px] object-cover"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => handleImageClick(1)}
                  className="block overflow-hidden rounded-lg"
                >
                  <Image
                    src={imageLayout[1].src}
                    width={148}
                    height={96}
                    alt="채팅 이미지 2"
                    className="h-[96px] w-[148px] object-cover"
                  />
                </button>
              </div>
              <div className="flex gap-2">
                {imageLayout.slice(2).map((img, i) => (
                  <button
                    key={i + 2}
                    type="button"
                    onClick={() => handleImageClick(i + 2)}
                    className="block overflow-hidden rounded-lg"
                  >
                    <Image
                      src={img.src}
                      width={96}
                      height={96}
                      alt={`채팅 이미지 ${i + 3}`}
                      className="h-[96px] w-[96px] object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div
              className={cn(
                bubbleOrder,
                "grid gap-2",
                imageCount === 3
                  ? "grid-cols-3"
                  : imageCount === 2
                    ? "grid-cols-2"
                    : imageCount === 4
                      ? "grid-cols-2"
                      : "grid-cols-1"
              )}
            >
              {imageLayout.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleImageClick(i)}
                  className={cn(
                    "block overflow-hidden rounded-2xl",
                    img.colSpan === 2 && "col-span-2"
                  )}
                >
                  <Image
                    src={img.src}
                    width={img.width}
                    height={img.height}
                    alt={`채팅 이미지 ${i + 1}`}
                    className={cn("object-cover", `w-[${img.width}px] h-[${img.height}px]`)}
                  />
                </button>
              ))}
            </div>
          )}
        </>
      )}
      <ImageViewerModal
        images={images}
        initialIndex={selectedImageIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ChatImageBox;
