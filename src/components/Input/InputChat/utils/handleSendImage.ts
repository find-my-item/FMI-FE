import { MockChatDataType } from "@/app/(route)/chat/_types/MockChatDataType";
import { SelectedImage } from "@/types/SelectedImage";
import { Dispatch, SetStateAction } from "react";

export const handleSendImage = (
  selectedImages: SelectedImage[],
  images: File[],
  setChats: Dispatch<SetStateAction<MockChatDataType[]>>,
  setImages: Dispatch<SetStateAction<File[]>>,
  setSelectedImages: Dispatch<SetStateAction<SelectedImage[]>>
) => {
  if (selectedImages.length === 0) return;

  const sorted = [...selectedImages].sort((a, b) => a.order - b.order);

  const imageUrls = sorted.map((item) => URL.createObjectURL(images[item.index]));

  setChats((prev) => [
    {
      sender: "me",
      images: imageUrls,
      time: "17:00",
    },
    ...prev,
  ]);
  setImages([]);
  setSelectedImages([]);
};
