import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const handleFileChange = (
  e: ChangeEvent<HTMLInputElement>,
  images: File[],
  setImages: Dispatch<SetStateAction<File[]>>
) => {
  if (!e.target.files) return;

  const selectedFiles = Array.from(e.target.files);
  const totalFiles = images.length + selectedFiles.length;

  if (totalFiles > 5) {
    selectedFiles.splice(5 - images.length);
  }

  setImages((prev) => [...prev, ...selectedFiles]);
  e.target.value = "";
};
