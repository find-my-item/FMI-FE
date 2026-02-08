"use client";

import { Icon, ImageSelectButton } from "@/components/common";
import { handleSendImage } from "../utils/handleSendImage";
import useSendImage from "@/api/fetch/ChatMessage/api/useSendImage";
import {
  InputChatImageSectionIds,
  InputChatImageSectionImageState,
} from "./InputChatImageSectionType";

interface InputChatImageSectionProps {
  ids: InputChatImageSectionIds;
  imageState: InputChatImageSectionImageState;
}

const InputChatImageSection = ({ ids, imageState }: InputChatImageSectionProps) => {
  const { roomId, userId } = ids;
  const { images, setImages, selectedImages, setSelectedImages } = imageState;
  const { mutate: sendImage } = useSendImage(roomId, userId);

  return (
    <>
      <div className="mb-[20px] flex items-center justify-between px-[4px] pb-[12px]">
        <button aria-label="사진 전송 취소 버튼" onClick={() => setImages([])}>
          <Icon name="XSecond" size={20} />
        </button>

        <button
          aria-label="사진 전송 버튼"
          onClick={() =>
            handleSendImage(selectedImages, images, setImages, setSelectedImages, sendImage)
          }
          className="p-1 text-body1-medium text-brand-normal-default disabled:text-brand-normal-disabled"
          disabled={!selectedImages.length}
        >
          {!selectedImages.length ? "사진 선택" : `사진 ${selectedImages.length}개 전송`}
        </button>
      </div>
      <ImageSelectButton
        images={images}
        setImages={setImages}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
      />
    </>
  );
};

export default InputChatImageSection;
