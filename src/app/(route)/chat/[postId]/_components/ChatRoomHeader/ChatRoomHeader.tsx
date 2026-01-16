"use client";

import { Icon } from "@/components/common";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MOCK_IMAGES } from "../../../_components/ChatItem/MOCK_IMAGES";
import ChatChip from "../ChatChip/ChatChip";
import ChatRoomHeaderInfoButton from "../ChatRoomHeaderInfoButton/ChatRoomHeaderInfoButton";
import { ChatRoomResponse } from "@/api/fetch/chatRoom/types/ChatRoomType";

const ChatRoomHeader = ({ chatRoom }: { chatRoom: ChatRoomResponse | undefined }) => {
  const router = useRouter();
  if (!chatRoom) return null;
  const { address, postType, title, thumbnailUrl } = chatRoom.postInfo;

  return (
    <header className="pb-[12px]">
      <nav className="flex items-center justify-between px-[16px] py-[4px]">
        <button
          className="flex h-[40px] w-[40px] items-center"
          aria-label="뒤로 가기 버튼"
          onClick={() => router.back()}
          type="button"
        >
          <Icon name="ArrowLeftSmall" size={18} />
        </button>

        <p className="text-body2-semibold text-layout-body-default">
          {chatRoom.opponentUser.nickname}
        </p>

        <ChatRoomHeaderInfoButton />
      </nav>

      <section className="flex items-center gap-[16px] px-[16px]">
        {/* TODO(형준): 대체 이미지 수정 예정 */}
        <Image
          alt="게시글 썸네일 이미지"
          src={thumbnailUrl || MOCK_IMAGES[0]}
          width={40}
          height={40}
          className="h-[40px] w-[40px] rounded"
        />

        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-1">
            <ChatChip postMode={postType} />
            <h2 className="truncate text-body1-semibold text-layout-header-default">{title}</h2>
          </div>
          <p className="h-[16px] text-caption1-medium text-layout-body-default">{address}</p>
        </div>
      </section>
    </header>
  );
};

export default ChatRoomHeader;
