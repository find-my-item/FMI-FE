import { ChangeEvent, Dispatch, SetStateAction } from "react";

const MAX_IMAGE_COUNT = 5;

/**
 * input[type="file"] change 이벤트에서 선택된 이미지 파일을 기존 images 상태에 추가합니다.
 * 최대 5장까지 유지하며, 초과분은 잘라냅니다.
 */
export const mergeImageFile = (
  e: ChangeEvent<HTMLInputElement>,
  images: File[],
  setImages: Dispatch<SetStateAction<File[]>>
) => {
  if (!e.target.files) return;

  const selectedFiles = Array.from(e.target.files);
  const totalFiles = images.length + selectedFiles.length;

  if (totalFiles > MAX_IMAGE_COUNT) {
    alert("사진은 최대 5장까지 선택 가능합니다.");
    selectedFiles.splice(MAX_IMAGE_COUNT - images.length);
  }

  setImages((prev) => [...prev, ...selectedFiles]);
  e.target.value = "";
};
