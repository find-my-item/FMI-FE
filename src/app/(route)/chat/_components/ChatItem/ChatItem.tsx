import Image from "next/image";
import Link from "next/link";
import { ChatRoom } from "@/api/fetch/auth/types/ChatListType";
import { Icon } from "@/components";
import { formatDate } from "@/utils";

interface ChatItemProps {
  chatRoom: ChatRoom;
}

const ChatItem = ({ chatRoom }: ChatItemProps) => {
  const { roomId, postInfo, contactUser, unreadCount, lastMessageSentAt, lastMessage } = chatRoom;

  return (
    <Link
      href={`chat/${roomId}`}
      className="flex min-h-[113px] w-full items-center gap-[12px] border-b border-divider-default px-[16px] py-[24px] duration-150 hover:bg-flatGray-25"
    >
      <section className="relative h-[58px] w-[58px] shrink-0">
        {contactUser?.profileImageUrl ? (
          <Image
            alt="유저 프로필 이미지"
            src={contactUser?.profileImageUrl}
            width={26}
            height={26}
            className="absolute left-0 top-0 z-10 rounded-full border-[1.5px] border-white"
          />
        ) : (
          <Icon
            name="UserProfile"
            size={26}
            className="absolute left-0 top-0 z-10 rounded-full border-[1.5px] border-white"
          />
        )}

        <Image
          alt="게시글 썸네일 이미지"
          src={postInfo?.thumbnailUrl || ""}
          width={50}
          height={50}
          className="absolute bottom-0 right-0 h-[50px] w-[50px] rounded object-cover"
        />
      </section>

      <section className="min-w-0 space-y-[2px]">
        <div className="flex items-center justify-between">
          <span className="text-h3-semibold text-layout-header-default">
            {contactUser?.nickname || "닉네임을 불러오지 못했습니다."}
          </span>
          {unreadCount > 0 && (
            <span className="h-[16px] w-[16px] rounded-full bg-flatGreen-500 text-caption2-semibold text-white flex-center">
              {unreadCount}
            </span>
          )}
        </div>
        <p className="text-caption1-medium text-layout-body-default">
          {postInfo?.address || "위치 정보를 불러오지 못했습니다."} ·
          {formatDate(lastMessageSentAt || "")}
        </p>
        <p className="truncate text-body2-medium text-layout-header-default">
          {lastMessage || "메시지를 불러오지 못했습니다."}
        </p>
      </section>
    </Link>
  );
};

export default ChatItem;
