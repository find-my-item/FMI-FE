import Image from "next/image";
import Link from "next/link";
import { ChatRoom } from "@/api/fetch/chatRoom/types/ChatRoomType";
import { ProfileAvatar } from "@/components/common";
import { formatDate } from "@/utils";
import { MOCK_IMAGES } from "./MOCK_IMAGES";

interface ChatItemProps {
  chatRoom: ChatRoom;
}

const ChatItem = ({ chatRoom }: ChatItemProps) => {
  const { lastMessageSentAt, lastMessage, unreadCount, messageType } = chatRoom;
  const { postId, address, thumbnailUrl } = chatRoom.postInfo;
  const { nickname, profileImageUrl } = chatRoom.contactUser;
  const { roomId } = chatRoom;

  const lastMessageIsImage = lastMessageSentAt && messageType === "IMAGE";

  return (
    <Link
      href={`/chat/${postId}?roomId=${roomId}`}
      aria-label={`${postId} 채팅방 링크`}
      className="flex min-h-[113px] w-full items-center gap-3 border-b border-divider-default px-4 py-6 transition-colors hover:bg-flatGray-25"
    >
      <div className="relative h-[58px] w-[58px] shrink-0">
        <ProfileAvatar
          src={profileImageUrl}
          alt="유저 프로필 이미지"
          size={26}
          className="absolute left-0 top-0 z-10 rounded-full border-[1.5px] border-white"
        />
        {/* TODO(형준): API 카테고리 반영 후 ListItemImage로 대체 예정 */}
        <Image
          alt="게시글 썸네일 이미지"
          src={thumbnailUrl || MOCK_IMAGES[0]}
          width={50}
          height={50}
          sizes="50px"
          className="absolute bottom-0 right-0 h-[50px] w-[50px] rounded object-cover"
        />
      </div>

      <div className="w-full min-w-0 space-y-[2px]">
        <div className="flex items-center justify-between truncate">
          <span className="truncate text-h3-semibold text-layout-header-default">
            {nickname || "닉네임을 불러오지 못했습니다."}
          </span>
          {unreadCount > 0 && (
            <span className="rounded-full bg-flatGreen-500 px-[5.5px] py-[1.5px] text-caption2-semibold text-white flex-center">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>
        <div className="flex truncate text-caption1-medium text-layout-body-default">
          <span className="truncate">{address || "위치 정보를 불러오지 못했습니다."}</span>
          <time className="flex-shrink-0 before:mx-1 before:content-['·']">
            {formatDate(lastMessageSentAt || "시간 정보가 없습니다.")}
          </time>
        </div>
        <p className="truncate text-body2-medium text-layout-header-default">
          {lastMessageIsImage ? "사진" : lastMessage || "메시지를 불러오지 못했습니다."}
        </p>
      </div>
    </Link>
  );
};

export default ChatItem;
