import { SelectedImage } from "@/types/SelectedImage";

export const getImageButtonState = (index: number, selectedImages: SelectedImage[]) => {
  const selected = selectedImages.find((item) => item.index === index);
  const isActive = Boolean(selected);
  const order = selected?.order;

  return { isActive, order };
};
