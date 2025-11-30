import { SelectedImage } from "@/types/SelectedImage";
import { Dispatch, SetStateAction } from "react";

export const handleClick = (
  imageIndex: number,
  setSelectedImages: Dispatch<SetStateAction<SelectedImage[]>>
) => {
  setSelectedImages((prev) => {
    const exists = prev.find((item) => item.index === imageIndex);

    if (exists) {
      return prev
        .filter((item) => item.index !== imageIndex)
        .map((item, i) => ({ ...item, order: i + 1 }));
    }

    return [...prev, { index: imageIndex, order: prev.length + 1 }];
  });
};
