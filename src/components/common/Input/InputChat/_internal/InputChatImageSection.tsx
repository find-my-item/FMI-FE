"use client";

import { Icon, ImageSelectButton } from "@/components/common";
import { handleSendImage } from "../utils/handleSendImage";
import { useChatRoom } from "@/providers/ChatRoomProvider";
import useSendImage from "@/api/fetch/ChatMessage/api/useSendImage";

const InputChatImageSection = ({ roomId }: { roomId: number }) => {
  const { images, setImages, selectedImages, setSelectedImages } = useChatRoom();

  const { mutate: sendImage } = useSendImage(roomId);

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
      <ImageSelectButton />
    </>
  );
};

export default InputChatImageSection;
