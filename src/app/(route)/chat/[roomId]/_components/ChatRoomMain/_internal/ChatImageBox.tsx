"use client";

import { useState } from "react";
import { cn } from "@/utils";
import { getImageLayout, getSpecialLayoutGroups } from "@/utils/getImageLayout/getImageLayout";
import dynamic from "next/dynamic";
import ChatImageButton from "./ChatImageButton";
const ImageViewerModal = dynamic(() => import("./ImageViewerModal"), { ssr: false });

const ChatImageBox = ({ images, bubbleOrder }: { images?: string[]; bubbleOrder: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const layout = getImageLayout(images);
  const specialGroups = layout.isSpecialLayout && getSpecialLayoutGroups(layout.items);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={cn(bubbleOrder, layout.containerClass)}>
        {layout.isSpecialLayout && specialGroups ? (
          <>
            <div className="flex gap-2">
              {specialGroups.topRow.map((img, i) => (
                <ChatImageButton key={i} {...img} index={i} onClick={handleImageClick} />
              ))}
            </div>
            <div className="flex gap-2">
              {specialGroups.bottomRow.map((img, i) => (
                <ChatImageButton
                  key={i + specialGroups.topRow.length}
                  {...img}
                  index={i + specialGroups.topRow.length}
                  onClick={handleImageClick}
                />
              ))}
            </div>
          </>
        ) : (
          layout.items.map((img, i) => (
            <ChatImageButton key={i} {...img} index={i} onClick={handleImageClick} />
          ))
        )}
      </div>

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
