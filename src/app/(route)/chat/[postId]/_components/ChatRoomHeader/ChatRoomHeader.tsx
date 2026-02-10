"use client";

import { Icon } from "@/components/common";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MOCK_IMAGES } from "../../../_components/ChatItem/MOCK_IMAGES";
import ChatChip from "../ChatChip/ChatChip";
import ChatRoomHeaderInfoButton from "../ChatRoomHeaderInfoButton/ChatRoomHeaderInfoButton";
import { ChatRoomResponse } from "@/api/fetch/chatRoom/types/ChatRoomResponse";
import Link from "next/link";

interface ChatRoomHeaderProps {
  chatRoom: ChatRoomResponse | undefined;
  roomId: number;
}

const ChatRoomHeader = ({ chatRoom, roomId }: ChatRoomHeaderProps) => {
  const router = useRouter();
  if (!chatRoom) return null;
  const { address, postType, title, thumbnailUrl, postId } = chatRoom.postInfo;
  const { nickname } = chatRoom.opponentUser;

  return (
    <header className="pb-3">
      <nav className="flex items-center justify-between px-4 py-1">
        <button
          className="flex h-10 w-10 items-center"
          aria-label="뒤로 가기 버튼"
          onClick={() => router.back()}
          type="button"
        >
          <Icon name="ArrowLeftSmall" size={18} />
        </button>

        <p className="text-body2-semibold text-layout-body-default">{nickname}</p>

        <ChatRoomHeaderInfoButton roomId={roomId} />
      </nav>

      <Link
        href={`/list/${postId}`}
        className="flex items-center gap-4 px-4"
        aria-label="게시글 상세 페이지 이동"
      >
        {/* TODO(형준): API 카테고리 반영 후 ListItemImage로 대체 예정 */}
        <Image
          alt="게시글 썸네일 이미지"
          src={thumbnailUrl || MOCK_IMAGES[0]}
          width={40}
          height={40}
          className="h-10 w-10 rounded"
        />

        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-1">
            <ChatChip postMode={postType} />
            <h2 className="truncate text-body1-semibold text-layout-header-default">{title}</h2>
          </div>
          <p className="h-4 text-caption1-medium text-layout-body-default">{address}</p>
        </div>
      </Link>
    </header>
  );
};

export default ChatRoomHeader;
