import { SelectedImage } from "@/types/SelectedImage";
import { Dispatch, SetStateAction } from "react";
import { resizeImage } from "@/utils";

export const handleSendImage = async (
  selectedImages: SelectedImage[],
  images: File[],
  setImages: Dispatch<SetStateAction<File[]>>,
  setSelectedImages: Dispatch<SetStateAction<SelectedImage[]>>,
  sendImage: (data: FormData) => void
) => {
  if (selectedImages.length === 0) return;

  const sorted = [...selectedImages].sort((a, b) => a.order - b.order);

  try {
    const resizedImages = await Promise.all(sorted.map((item) => resizeImage(images[item.index])));

    const formData = new FormData();
    resizedImages.forEach((resizedFile) => {
      formData.append("images", resizedFile);
    });

    sendImage(formData);

    setImages([]);
    setSelectedImages([]);
  } catch (error) {
    console.error("이미지 리사이즈 실패:", error);
    alert("이미지 처리 중 오류가 발생했습니다.");
  }
};
