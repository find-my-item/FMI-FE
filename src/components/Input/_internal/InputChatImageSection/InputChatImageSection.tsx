import { Icon, ImageSelectButton } from "@/components";
import { handleSendImage } from "./handleSendImage";
import { useChatRoom } from "@/app/(route)/chat/[roomId]/_components/ChatRoomProvider/ChatRoomProvider";

const InputChatImageSection = () => {
  const { setChats, images, setImages, selectedImages, setSelectedImages } = useChatRoom();

  return (
    <div>
      <div className="mb-[20px] flex items-center justify-between px-[4px] pb-[12px]">
        <button aria-label="사진 전송 취소 버튼" onClick={() => setImages([])}>
          <Icon name="XSecond" size={20} />
        </button>

        <button
          aria-label="사진 전송 버튼"
          onClick={() =>
            handleSendImage(selectedImages, images, setChats, setImages, setSelectedImages)
          }
          className="p-1 text-body1-medium text-brand-subtle-default"
        >
          사진 {selectedImages.length}개 전송
        </button>
      </div>
      <ImageSelectButton gap={16} />
    </div>
  );
};

export default InputChatImageSection;
