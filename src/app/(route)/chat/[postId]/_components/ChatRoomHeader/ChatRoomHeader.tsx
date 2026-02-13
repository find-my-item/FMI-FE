"use client";

import { Icon, ListItemImage } from "@/components/common";
import { useRouter } from "next/navigation";
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
  const { address, postType, title, thumbnailUrl, postId, category } = chatRoom.postInfo;
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
        <div className="shrink-0">
          <ListItemImage
            alt="채팅방 게시글 썸네일"
            size={40}
            src={thumbnailUrl}
            category={category}
          />
        </div>
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
